import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService, UserService } from '../../shared/services';
import { User, Branch, Location } from '../../shared/model';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {} from '@types/bootbox';

@Component({
  selector: 'app-branch-office-create',
  templateUrl: './branch-office-form.component.html',
  styles: [`
    agm-map {
        height: 300px;
    }
 `],
 providers: [ BranchService, UserService ]
})
export class BranchOfficeCreateComponent implements OnInit {
    public users: User[];
    public branch: Branch;

    public title: string;

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    public items: any = { users: [], selected: { user: [] }};

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
        private _branchService: BranchService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
        this.title = 'Nueva sucursal';
        this.branch = new Branch();
    }

    ngOnInit() {
        this.getSupervisors();

        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //set current position
        this._setCurrentPosition();

        //create search FormControl
        this.searchControl = new FormControl();

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

    getSupervisors = () => {
        this._userService.getAllByKind(User.KIND_SUPERVISOR).subscribe(
            result => {
                let agents = result.data;
                agents.forEach(agent => this.items['users'].push({id: agent.id, text: new User(agent).full_name}));
            },
            error => {
                console.log(error);
                alert('Hay un error en la petición');
            }
        )
    }

    onSubmit = () => {
        this.branch.location.latitude = "" + this.latitude;
        this.branch.location.longitude = "" + this.longitude;

		this._branchService.createBranch(this.branch).subscribe(
			response => {
                bootbox.alert(response.msg);
                this._router.navigate(['/sucursales']);
			},
			error => {
				console.log(error);
			    alert('Hay un error en la petición');
			}
		);
    }

    setUser = (value: any) => {
        this.branch.user_id = value.id;
    }

    removeUser = (value:any) => {
        this.branch.user_id = null;
    }

}
