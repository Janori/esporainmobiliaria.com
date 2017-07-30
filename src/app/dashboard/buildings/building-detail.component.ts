import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BuildingService } from '../../shared/services';
import { Building } from '../../shared/model';
import { MapsAPILoader } from '@agm/core';
import { Lightbox } from 'angular2-lightbox';
import {} from '@types/googlemaps';
import {} from '@types/bootbox';

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
    public _albums: Array<any> = [];

    constructor(
        private _buildingService: BuildingService,
        private _router: Router,
        private _route: ActivatedRoute,
        private mapsAPILoader: MapsAPILoader,
        private _lightbox: Lightbox
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

                    this.building.images.forEach((image) => {
                        const src = this.url + 'public/images/bld/' + image.path;
                        // const caption = 'Image ' + i + ' caption here';
                        const thumb = this.url + 'public/images/bld/thumb_' + image.path;
                        const album = {
                        src: src,
                        caption: null,
                        thumb: thumb
                        };

                        this._albums.push(album);
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

    open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }

}
