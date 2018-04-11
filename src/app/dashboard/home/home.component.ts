import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/User';
import { Building } from '../../shared/model/Building';
import { IGoalCard } from './items/goal-cards/goal-cards.component';
import { AgentService } from '../../shared/services';
import { Subject } from 'rxjs/Rx';

declare var lscache: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ AgentService ]
})
export class HomeComponent implements OnInit {
    public user: User;
    public isDataLoaded: boolean = false;
    public data: any = null;

    public dtOptions: DataTables.Settings = {
        language: { url: 'assets/DatatablesSpanish.json' },
        destroy: true
    };
    public dtTrigger: Subject<any> = new Subject<any>();

    public gcNewBuildings:IGoalCard = {
        title: "Inmuebles nuevos",
        value: 45,
        percent: 20,
        icon: "icon-home",
        data: null
    }
    public gcActiveBuildings:IGoalCard = {
        title: "Activos",
        value: 45,
        percent: 50,
        icon: "icon-home",
        data: null
    }
    public gcSoldBuildings:IGoalCard = {
        title: "Vendidos",
        value: 45,
        percent: 90,
        icon: "icon-home",
        data: null
    }
    public gcExpiredBuildings:IGoalCard = {
        title: "Expirados",
        value: 45,
        percent: 40,
        icon: "icon-home",
        data: null
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

            this.gcNewBuildings.data       = result.gcNewBuildings.data;
            this.gcActiveBuildings.data    = result.gcActiveBuildings.data;
            this.gcSoldBuildings.data      = result.gcSoldBuildings.data;
            this.gcExpiredBuildings.data   = result.gcExpiredBuildings.data;
        });
    }

    onCardClick(data: any) {
        this.isDataLoaded = false;
        this.data = [];
        data.forEach(item => this.data.push(new Building(item)));
        // this.data = data;
        this.isDataLoaded = true;
        this.dtTrigger.next();
    }

}
