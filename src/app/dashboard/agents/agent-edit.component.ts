import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validation';
import { AgentService, BranchService } from '../../shared/services';
import { User as Agent, Branch } from '../../shared/model';

declare var bootbox: any;

@Component({
    selector: 'app-agent-edit',
    templateUrl: './agent-form.component.html',
    styleUrls: [ '../../../assets/pages/css/profile.min.css' ],
    encapsulation: ViewEncapsulation.None,
    providers: [ AgentService, BranchService ]
})

export class AgentEditComponent implements OnInit {
    public agent: Agent;
    public branches: Branch[];

    public url: string;
    public passwordForm: FormGroup;

    constructor(
        private _agentService: AgentService,
        private _branchService: BranchService,
        private _route : ActivatedRoute,
		private _router : Router,
        public fb: FormBuilder
    ) {
        this.passwordForm = fb.group({
            // define your control in you form
            password: ["", Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        })
        this.agent = new Agent();
        this.url = _agentService.url;
    }

    ngOnInit() {
        this.getAgent();
        this.getAllBranches();
    }

    getAgent = () => {
        this._route.params.forEach((params : Params) => {
			let id = params['id'];

			this._agentService.getUser(id).subscribe(
				result => {
                    if(!result.status)
                    	this._router.navigate(['/']);

                    this.agent = new Agent(result.data);
                    console.log(this.agent);
				},
				error => {
					console.log(error);
					alert('Hay un error en la petición');
				}
			);
		});
    }

    getAllBranches = () => {
        this._branchService.getAllBranches().subscribe(
            result => {
                this.branches = result.data;

                for(var i = 0; i < this.branches.length; i++)
                   this.branches[i] = new Branch(this.branches[i]);

            },
            error => {
                console.log(error);
                alert('Hay un error en la petición');
            }
        );
    }

    onSubmit = () => {
        this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._agentService.editUser(id, this.agent).subscribe(
				response => {
                    bootbox.alert(response.msg);
                    this._router.navigate(['/agentes']);
				},
				error => {
					console.log(error);
				    alert('Hay un error en la petición');
				}
			);
		});
    }


}
