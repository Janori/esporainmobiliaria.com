import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/User';
import { IGoalCard } from './items/goal-cards/goal-cards.component';
import { AgentService } from '../../shared/services';

declare var lscache: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ AgentService ]
})
export class HomeComponent implements OnInit {
    public user: User;

    public gcNewBuildings:IGoalCard = {
        title: "Inmuebles nuevos",
        value: 45,
        percent: 20,
        icon: "icon-home"
    }
    public gcActiveBuildings:IGoalCard = {
        title: "Activos",
        value: 45,
        percent: 50,
        icon: "icon-home"
    }
    public gcSoldBuildings:IGoalCard = {
        title: "Vendidos",
        value: 45,
        percent: 90,
        icon: "icon-home"
    }
    public gcExpiredBuildings:IGoalCard = {
        title: "Expirados",
        value: 45,
        percent: 40,
        icon: "icon-home"
    }


    constructor(private _agentService: AgentService) {
        this.user = lscache.get('user');
    }

    ngOnInit() {
        this._agentService.getChartData().subscribe(result => {
            this.gcNewBuildings.value       = result.gcNewBuildings.value;
            this.gcActiveBuildings.value    = result.gcActiveBuildings.value;
            this.gcSoldBuildings.value      = result.gcSoldBuildings.value;
            this.gcExpiredBuildings.value   = result.gcExpiredBuildings.value;
        });
    }

}
