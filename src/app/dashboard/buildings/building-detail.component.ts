import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BuildingService } from '../../shared/services';
import { Building } from '../../shared/model';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {} from '@types/bootbox';
import {} from '@types/toastr';

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  providers: [ BuildingService ],
  styles: [`
    agm-map {
        height: 300px;
    }
 `]
})
export class BuildingDetailComponent implements OnInit {
    public title: string;
    public building: Building;
    public url: string;
    public latitude: number;
    public longitude: number;
    public zoom: number;
    public keysEnum: any = {};

    public myInterval: number = 5000;
    public slides: any[] = [];
    public activeSlideIndex: number;
    public noWrapSlides:boolean = false;

    public map: any;
    public places: any = [];


    constructor(
        private _buildingService: BuildingService,
        private _router: Router,
        private _route: ActivatedRoute,
        private mapsAPILoader: MapsAPILoader
    ) {
        this.title = "";
        this.building = new Building();
        this.url = this._buildingService.url;

        this.keysEnum.land = {
            for_sale: 'En venta',
            price: 'Precio',
            surface: 'Superficie en m<sup>2</sup>',
            predial_cost: 'Costo del predial'
        }

        this.keysEnum.warehouse = {
            is_new: 'Es nuevo',
            build_surface: 'Superifice de construcción en m<sup>2</sup>',
            building_date: 'Fecha de construcción'
        }

        this.keysEnum.office = {
            baths: 'Número de baños',
            parkings: 'Número de estacionamientos',
            kind: 'Tipo'
        }

        this.keysEnum.house = {
            rooms: 'Número de cuartos'
        }
    }

    ngOnInit() {
        this.zoom = 12;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        this.getBuilding();
        // this.mapsAPILoader.load().then(() => {
        //     var service = new google.maps.places.PlacesService(null);
        //     service.nearbySearch({
        //         location : new google.maps.LatLng(this.latitude, this.longitude),
        //         radius : 5500,
        //         types : [ 'restaurant' ]
        //     }, (results, status) => {
        //         console.log(results, status);
        //     });
        // });
    }

    mapReady = (map) => {
        this.map = map;
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
                    this.title = 'Inmueble #' + this.building.id;

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

                    this.building.images.forEach((image) => {
                        this.slides.push({
                         image: this.url + 'public/images/bld/' + image.path
                       });
                    });
				},
				error => {
					console.log(error);
					alert('Hay un error en la petición');
				}
			);
		});
    }

    response = (key, value) => {
        switch(key) {
            case 'for_sale':
            case 'is_new':
                if(value == 1)
                    return 'Sí';
                return 'No';
            case 'price':
            case 'predial_cost':
                return '$ ' + parseFloat("" + value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' M.N';
            case 'surface':
            case 'build_surface':
                return value + ' m<sup>2</sup>';
            case 'building_date':
                return new Date(value).toLocaleDateString('es-Es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            default:
                return value;
        }
    }

    sendBuilding = () => {
        var self = this;
        bootbox.prompt({
            size: 'small',
            title: "Ingresa un correo electrónico",
            inputType: 'email',
            buttons: {
                confirm: {
                label: 'Aceptar',
                className: 'btn-primary'
                },
                    cancel: {
                    label: 'Cancelar',
                    className: 'btn-default'
                }
            },
            callback: function(result){
                self._buildingService.sendBuilding(self.building.id, result).subscribe(
                    result => {
                        if(result.status)
                            toastr.success(result.msg, '¡Hecho!');
                        else
                            toastr.error(result.msg, '¡Error!');
                    },
                    error => {
                        console.log(error);
                        alert('Hay un error en la petición');
                    }
                )
            }
        });
    }
}
