import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { Customer } from '../../shared/model/';
import { CustomerService } from '../../shared/services';

declare var bootbox: any;
declare var lscache: any;

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    providers: [ CustomerService ]
})
export class CustomersComponent implements OnInit {
    public prospects: Customer[] = [];
    public kindClient: string;

    public dtOptions: DataTables.Settings = {
        language: { url: 'assets/DatatablesSpanish.json' },
        destroy: true
    };
    public dtTrigger: Subject<any> = new Subject<any>();

    constructor(
        private _customerService: CustomerService,
        private _router: Router
    ) {
        if(this._router.url.includes('prospectos'))
            this.kindClient = 'prospects';
        else
            this.kindClient = 'owners';
    }

    ngOnInit() {
        this.getAllProspects();
    }

    getAllProspects = () => {
        // this._customerService.getAllProspects(this.kindClient).subscribe(
        //     result => {
        //         console.log(result);
        //     }, error => {
        //
        //     }
        // )
    }

    deleteProspect = (id: Number) => {
        var self = this;
        bootbox.confirm({
            message: "¿Está seguro que desea eliminar este usuario?",
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
            }
        });
    }
}
