import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BuildingService } from '../../shared/services';
import { Building } from '../../shared/model';
import { MapsAPILoader } from '@agm/core';
import { IMyDpOptions } from 'mydatepicker';
import {} from '@types/googlemaps';
import {} from '@types/bootbox';

declare var lscache: any;

@Component({
    selector: 'app-building-edit',
    templateUrl: './building-form.component.html',
    providers: [ BuildingService ],
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

    constructor(
        private _buildingService: BuildingService,
        private _router: Router,
        private _route: ActivatedRoute,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
        this.token = lscache.get('authToken');
        this.title = "Editar inmueble";
        this.building = new Building();
        this.url = this._buildingService.url;
    }

    ngOnInit() {
        //set google maps defaults
        this.zoom = 12;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //set current position
        this.getBuilding();
        this._setCurrentPosition();

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

    getBuilding = () => {
        this._route.params.forEach((params : Params) => {
			let id = params['id'];

			this._buildingService.getBuilding(id).subscribe(
				result => {
                    if(!result.status)
                    	this._router.navigate(['/']);

                    this.building = new Building(result.data);
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

}
