import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../shared/services';
import { Building } from '../../shared/model';
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
    constructor(
        private _buildingService: BuildingService
    ) { }

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
}
