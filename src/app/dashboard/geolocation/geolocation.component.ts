import { Component, OnInit, ElementRef, NgZone, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styles: [`
    agm-map {
        height: 300px;
    }
 `]
})
export class GeolocationComponent implements OnInit {
    public title: string;

    public latitude: number;
    public longitude: number;
    public zoom: number;

    public map: any;
    public places: any = [];

    constructor(
        private _router: Router,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
        this.title = "Geolocalización";
    }

    ngOnInit() {
        //set google maps defaults
        this.zoom = 12;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //set current position
        this._setCurrentPosition();

    }

    _setCurrentPosition = () =>  {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;


                var service = new google.maps.places.PlacesService(this.map);
                service.nearbySearch({
                    location : new google.maps.LatLng(this.latitude, this.longitude),
                    radius : 5500,
                    types : [ 'restaurant', 'school', 'movie_theater', 'bank', 'university', 'store', 'shopping_mall', 'gas_station']
                }, (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];

                            if(this.places.length < 5)
                                this.places.push({name: place.name});
                        }
                    }
                });
            });
        }
        else {
            bootbox.alert('No es posible obtener la ubicación de tu dispositivo');
            this._router.navigate(['/']);
        }
    }

    mapReady = (map) => {
        this.map = map;
    }


}
