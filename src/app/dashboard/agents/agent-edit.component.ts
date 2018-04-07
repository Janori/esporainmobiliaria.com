import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { PasswordValidation } from './password-validation';
import { AgentService, BranchService } from '../../shared/services';
import { User as Agent, Branch } from '../../shared/model';

declare var bootbox: any;
declare var lscache: any;

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

    public uploader: FileUploader;
    public token:string;

    public items: any = { branches: [], selected: { branch: [] }};

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

                    if(this.agent.branch_id != null)
                        this.items.selected['branch'].push({ id: this.agent.branch.id, text: this.agent.branch.name });

                    this.uploader = new FileUploader({url: this.url + 'user/' + this.agent.id + '/files/curriculum', authToken: lscache.get('authToken')});

				},
				error => {
					console.log(error);
					toastr.error('Hay un error en la petición', '¡Error!');
				}
			);
		});
    }

    getAllBranches = () => {
        this._branchService.getAllBranches().subscribe(
            result => {
                let branchs = result.data;
                branchs.forEach(branch => this.items['branches'].push({id: branch.id, text: branch.name}));
            },
            error => {
                console.log(error);
                toastr.error('Hay un error en la petición', '¡Error!');
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
				    toastr.error('Hay un error en la petición', '¡Error!');
				}
			);
		});
    }

    setBranch = (value: any) => {
        this.agent.branch_id = value.id;
    }

    removeBranch = (value:any) => {
        this.agent.branch_id = null;
    }


}
