import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/model';
import { CustomerService } from '../../../shared/services';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.css'],
    providers: [ CustomerService ]
})

export class CustomerFormComponent implements OnInit {
    public componentKind: string;
    public customer: Customer;

    constructor(
        private _router: Router,
        private _route : ActivatedRoute,
        private _customerService: CustomerService,
    ) {
        if(this._router.url.includes('crear'))
            this.componentKind = 'crear';
        else
            this.componentKind = 'editar';
    }

    ngOnInit() {
        this.customer = new Customer();
        if(this.componentKind == 'editar') {
            this._route.params.forEach((params : Params) => {
    			let id = params['id'];
                this._customerService.getCustomer(id).subscribe(
                    result => {
                        console.log(result);
                    },
                    error => {

                    }
                )
            });
        }
    }
}
