import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { BuildingService } from '../../shared/services';
import { Building, Land } from '../../shared/model';
import { Subject } from 'rxjs/Rx';
import {} from '@types/bootbox';

declare var lscache: any;

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  providers: [ BuildingService ]
})

export class BuildingsComponent implements OnInit {
    public buildings: Building[];
    public kind: string;
    public filter: any = {};

    @ViewChild('type') type: ElementRef;
    @ViewChild('disponibility') disponibility: ElementRef;
    @ViewChild('priceFilter') price: any;
    @ViewChild('surfaceFilter') surface: any;
    @ViewChild('bathFilter') baths: any;
    @ViewChild('roomFilter') rooms: any;

    constructor(
        private _buildingService: BuildingService,
    ) {
    }

    ngOnInit() {
        this.getAllBuildings();
    }

    getAllBuildings = () => {
        this._buildingService.getAllBuildings().subscribe(
            result => {
                this.buildings = result.data;
                this.buildings.forEach((building, i, buildings) => {
                    buildings[i] = new Building(building);
                });
            },
            error => {
                console.log(error);
                alert('Hay un error en la petición');
            }
        );
    }

    deleteBuilding = (id: Number) => {
        var self = this;
        bootbox.confirm({
            message: "¿Está seguro que desea eliminar este inmueble?",
            buttons: {
                confirm: {
                    label: 'Sí',
                    className: 'btn-danger'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if(result) {
                    self._buildingService.deleteBuilding(id).subscribe(
                        result => {
                            bootbox.alert(result.msg);
                            self.getAllBuildings();
                        },
                        error => {
                            console.log(error);
                            alert('Hay un error en la petición');
                        }
                    )
                }
            }
        });
    }

    setType = ($event) => {
        let type = $event.target.value;
        this.kind = type;
        console.log(this.kind);
    }

    applyFilters = () => {
        this.filter = {};
        this.filter.type = this.type.nativeElement.value;
        this.filter.disponibility = this.disponibility.nativeElement.value;
        this.filter.price = {from: this.price.from, to: this.price.to}
        this.filter.surface = {from: this.surface.from, to: this.surface.to}
        if(this.filter.type == 'Oficina' || this.filter.type == 'Casa')
            this.filter.baths = {from: this.baths.from, to: this.baths.to}
        if(this.filter.type == 'Casa')
            this.filter.rooms = {from: this.rooms.from, to: this.rooms.to}

        this._buildingService.getFilterBuildings(this.filter).subscribe(
            result => {
                let buildings = result.data;

                buildings.forEach((building, i, buildings) => {
                    buildings[i] = new Building(building);
                    buildings[i].land = new Land(building);
                });

                this.buildings = buildings;
            },
            error => {
                console.log(error);
                alert('Hay un error en la petición');
            }
        );
    }
}
