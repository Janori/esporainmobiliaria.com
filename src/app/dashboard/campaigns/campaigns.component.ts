import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent} from 'ngx-bootstrap';
import { CustomerService } from '../../shared/services';
import { Customer, Building } from '../../shared/model';

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.css'],
    providers: [ CustomerService ]
})

export class CampaignsComponent implements OnInit {
    public customers: Customer[] = [];
    public buildings: Building[] = [];
    public buildingKind = [
        'Casas',
        'Departamentos',
        'Oficinas',
        'Terrenos',
        'Edificios',
        'Parques industriales',
        'Plantas industriales',
        'Hoteles',
        'Ranchos',
        'Haciendas y quintas/Granjas',
        'Predio rustico',
    ];
    public title: string = 'Campañas de correo';
    public numberOfBuildings = 1;
    public totalItems = 40;
    public smallnumPages = 0;
    public selectedBuildings: any = [];
    public checked: boolean = true;

    @ViewChild(TabsetComponent) tabset: TabsetComponent;


    constructor(private _customerService: CustomerService) {
    }

    ngOnInit() {
    }

    showProspects = ($event) => {
        this._customerService.getProspectsByBuilding($event.target.value).subscribe(
            result => {
                this.customers  = [];
                this.buildings  = [];
                result.data.customers.forEach(customer => this.customers.push(new Customer(customer)));
                result.data.buildings.forEach(building => this.buildings.push(new Building(building)));
            },
            error => {
                console.log(error);
            }
        )
    }

    selectBuilding = (id: number, $event) => {
        $event.preventDefault();

        if(this.selectedBuildings.indexOf(id) != -1) {
            this.selectedBuildings.splice(this.selectedBuildings.indexOf(id), 1);
            $event.target.checked = false;
        }
        else {
            if(this.selectedBuildings.length == this.numberOfBuildings) {
                alert('No puede seleccionar más inmuebles');
                return;
            }

            this.selectedBuildings.push(id);
            $event.target.checked = true;
        }
    }

    sendCampaign = () => {
        let data = {
            customers: this.customers,
            buildings: this.selectedBuildings
        };

        this._customerService.sendCampaign(data).subscribe(
            result => {
                if(result.status) {
                    toastr.success(result.msg, '¡Éxito!');
                }
            },
            error => {
                toastr.error('¡Hubo un error en el servidor!', 'Error');
            }
        );
    }
}
