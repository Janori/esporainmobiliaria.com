import { Component, OnInit } from '@angular/core';
import { AgentService, BranchService } from '../../shared/services';
import { User as Agent, Branch } from '../../shared/model';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-agents',
    templateUrl: './agents.component.html',
    providers: [ AgentService, BranchService ]
})

export class AgentsComponent implements OnInit {
    public agents: Agent[];
    public branches: Branch[];

    public dtOptions: DataTables.Settings = {};
    public dtTrigger: Subject<any> = new Subject<any>();

    constructor(
        private _agentService: AgentService,
        private _branchService: BranchService
    ) {
    }

    ngOnInit() {
        this.getAllAgents();
        this.getAllBranches();
    }

    getAllAgents = () => {
        this._agentService.getAllAgents().subscribe(
            result => {
                this.agents = result.data;

                for(var i = 0; i < this.agents.length; i++)
                   this.agents[i] = new Agent(this.agents[i]);

                 this.dtTrigger.next();

            },
            error => {
                console.log(error);
                alert('Hay un error en la petición');
            }
        )
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

}
