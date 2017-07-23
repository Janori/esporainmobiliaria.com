import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../shared/services';
import { User as Agent } from '../../shared/model';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-agents',
    templateUrl: './agents.component.html',
    providers: [ AgentService ]
})

export class AgentsComponent implements OnInit {
    public agents: Agent[];

    public dtOptions: DataTables.Settings = {};
    public dtTrigger: Subject<any> = new Subject<any>();

    constructor(
        private _agentService: AgentService
    ) {
    }

    ngOnInit() {
        this.getAllAgents();
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

}
