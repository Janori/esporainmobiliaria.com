import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BuildingService, CustomerService, AgentService } from '../../shared/services';
import { Building, Customer, User } from '../../shared/model';
import { MapsAPILoader } from '@agm/core';
import { IMyDpOptions } from 'mydatepicker';
import {} from '@types/googlemaps';
import {} from '@types/bootbox';

declare var lscache: any;

@Component({
    selector: 'app-building-edit',
    templateUrl: './building-form.component.html',
    providers: [ BuildingService, CustomerService, AgentService ],
    styles: [`
      agm-map {
          height: 300px;
      }
   `]
})

export class BuildingEditComponent implements OnInit {
    public title: string;
    public url: string;
    public building: Building;

    public latitude: number;
    public longitude: number;
    // public searchControl: FormControl;
    public zoom: number;
    public token: string;

    @ViewChild("search")
    public searchElementRef: ElementRef;


    public myDatePickerOptions: IMyDpOptions = {
       // other options...
       dateFormat: 'yyyy-mm-dd',
       todayBtnTxt: 'Today',
       firstDayOfWeek: 'mo',
       dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mié', th: 'Jue', fr: 'Vie', sa: 'Sáb'},
       showTodayBtn: false,
       inline: false,
       editableDateField: false,
       openSelectorOnInputClick: true,
       maxYear: new Date().getFullYear(),
    };

   public model: Object = {};
    public items: any = { customers: [], users: [], selected: { customer: [], user: [] }};
    public selectorDisabled: boolean;
    constructor(
        private _buildingService: BuildingService,
        private _customerService: CustomerService,
        private _agentService: AgentService,
        private _router: Router,
        private _route: ActivatedRoute,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
        this.token = lscache.get('authToken');
        this.title = "Editar inmueble";
        this.building = new Building();
        this.url = this._buildingService.url;

        this.selectorDisabled = lscache.get('user').kind == User.KIND_AGENT;
    }

    ngOnInit() {
        //set google maps defaults
        this.zoom = 12;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //set current position
        var self = this;
        this.getBuilding();
        this._setCurrentPosition();

        setTimeout(function() {
            self.getOwners();
            self.getAgents();

            if(self.selectorDisabled)
                self.items.selected['user'].push({ id: lscache.get('user').id, text: new User(lscache.get('user')).full_name });
        }, 500);
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });
    }

    _setCurrentPosition = () =>  {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

    getOwners = () => {
        this._customerService.getAllCustomers('owners').subscribe(
            result => {
                let customers = result.data;
                customers.forEach(customer => this.items['customers'].push({id: customer.id, text: new Customer(customer).full_name}));
            },
            error => {
                console.log(error);
                alert('Hay un error en la petición');
            }
        )
    }

    getAgents  = () => {
        this._agentService.getAllAgents().subscribe(result => {
            let agents = result.data;
            agents.forEach(agent => this.items['users'].push({id: agent.id, text: new User(agent).full_name}));
        },
        error => {
            toastr.error('Hubo un error en el servidor', '¡Error!');
            console.log(error);
        });
    }

    getBuilding = () => {
        this._route.params.forEach((params : Params) => {
			let id = params['id'];

			this._buildingService.getBuilding(id).subscribe(
				result => {
                    if(!result.status)
                    	this._router.navigate(['/']);

                    this.building = new Building(result.data);

                    if(this.building.customer_id != null)
                        this.items.selected['customer'].push({ id: this.building.customer.id, text: this.building.customer.full_name });

                    if(this.building.user_id != null)
                        this.items.selected['user'].push({ id: this.building.user.id, text: this.building.user.full_name });

                    var d = new Date(this.building.warehouse.building_date);
                    this.model = {date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }}
                    this.latitude = parseFloat(this.building.land.location.latitude);
                    this.longitude = parseFloat(this.building.land.location.longitude);
				},
				error => {
					console.log(error);
					alert('Hay un error en la petición');
				}
			);
		});
    }

    onSubmit = () => {
        this._route.params.forEach((params : Params) => {
			let id = params['id'];
            this.building.land.location.latitude = "" + this.latitude;
            this.building.land.location.longitude = "" + this.longitude;
            this.building.address = $('input[name="address"]').val();
            this._buildingService.editBuilding(id, this.building).subscribe(
                result => {
                    bootbox.alert(result.msg);
                    this._router.navigate(['/inmuebles']);

                },
                error => {
                    console.log(error);
                    alert('Hay un error en la petición');
                }
            );
        });
    }

    setType = ($event) => {
        let type = $event.target.value;
        this.building.kind = type;
    }

    keyDownFunction = (event) =>  {
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    }

    onDateChanged = (event) => {
        this.building.warehouse.building_date = event.formatted;
    }

    removeImage = (id: number) => {
        this._buildingService.deleteImage(id).subscribe(
            result => {
                bootbox.alert(result.message);
                this.getBuilding();
            }
        );
    }

    setUser = (value: any) => {
        this.building.user_id = value.id;
    }

    removeUser = (value: any) => {
        this.building.user_id = null;
    }
}
