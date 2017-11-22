import { Component, OnInit } from '@angular/core';
import { Customer, User, Building } from '../../shared/model';
import { CustomerService, AgentService, BuildingService } from '../../shared/services';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

declare var lscache: any;

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    providers: [ CustomerService, AgentService, BuildingService ]
})

export class CustomerFormComponent implements OnInit {
    public componentKind: string;
    public customerKind: string;
    public customer: Customer;
    public title: string;
    public items: any = { users: [], buildings: [], selected: { user: [], building: [] }};
    public uploader: FileUploader = null;
    public authToken: string;

    constructor(
        private _router: Router,
        private _route : ActivatedRoute,
        private _customerService: CustomerService,
        private _agentService: AgentService,
        private _buildingService: BuildingService,
    ) {
        if(this._router.url.includes('crear'))
            this.componentKind = 'crear';
        else
            this.componentKind = 'editar';

        if(this._router.url.includes('prospectos')) {
            this.title = 'Prospectos';
            this.customerKind = 'prospects';
        }
        else {
            this.title = 'Propietarios';
            this.customerKind = 'owners';
        }

        this.authToken = lscache.get('authToken');
    }

    ngOnInit() {
        this.customer = new Customer();
        this.customer.kind = this.customerKind[0];

        if(this.componentKind == 'editar') {
            this._route.params.forEach((params : Params) => {
    			let id = params['id'];
                this._customerService.getCustomer(id).subscribe(
                    response => {
                        this.customer = new Customer(response.data.customer);

                        if(this.customer.prospect.user_id != null)
                            this.items.selected['user'].push({ id: this.customer.prospect.user_id, text: new User(this.customer.prospect.user).full_name });
                        if(this.customer.prospect.building_id != null)
                            this.items.selected['building'].push({ id: this.customer.prospect.building_id, text: 'Inmueble #' + this.customer.prospect.building.id });

                        let url = this._customerService.url + 'customer/' + this.customer.id + '/file';

                        this.uploader = new FileUploader({
                            url: url,
                            authToken: this.authToken
                        });
                    },
                    error => {
                        alert('Hubo un error en el servidor');
                        this._router.navigate(['/'])
                    }
                )
            });
        }

        var self = this;
        setTimeout(function() {
            self.getAgents();
            self.getBuildings();
        }, 500);

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

    getBuildings = () => {
        this._buildingService.getAllBuildings().subscribe(result => {
            let buildings = result.data;
            buildings.forEach(building => this.items['buildings'].push({id: building.id, text: 'Inmueble #' + building.id}));
        },
        error => {
            toastr.error('Hubo un error en el servidor', '¡Error!');
            console.log(error);
        });
    }

    onSubmit = () => {
        if(this.customer.id) {
            this._customerService.editCustomer(this.customer.id, this.customer).subscribe(
                response => {
                    let route = this.customer.kind == 'p' ? 'prospectos' : 'propietarios';
                    if(response.status) {
                        bootbox.alert(response.msg);
                        this._router.navigate([route]);
                    }
                },
                error => {

                }
            );
        }
        else {
            this._customerService.createCustomer(this.customer).subscribe(
                response => {
                    let route = this.customer.kind == 'p' ? 'prospectos' : 'propietarios';
                    if(response.status) {
                        bootbox.alert(response.msg);
                        this._router.navigate([route]);
                    }
                },
                error => {

                }
            );
        }
    }

    setUser = (value: any) => {
        this.customer.prospect.user_id = value.id;
    }

    removeUser = (value:any) => {
        this.customer.prospect.user_id = null;
    }

    setBuilding = (value: any) => {
        this.customer.prospect.building_id = value.id;
    }

    removeBuilding = (value:any) => {
        this.customer.prospect.building_id = null;
    }

    uploadFile = ($event) => {
        console.log('alert');
        this.uploader.uploadAll();
        var self = this;
        setTimeout(function() {
            self._customerService.getCustomer(self.customer.id).subscribe(
                result => {
                    self.customer = new Customer(result.data.customer);
                    if(self.customer.file_path != null)
                        bootbox.alert('Subida de archivo terminada con éxito');
                    else
                        bootbox.alert('Hubo un error al subir el archivo');
                },
                error => {
                    bootbox.alert('Hubo un error en el servidor');
                }
            );
        }, 3000);
    }

    removeActualFile = () => {
        this.customer.file_path = null;
    }
}
