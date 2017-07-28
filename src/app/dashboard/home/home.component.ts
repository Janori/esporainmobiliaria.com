import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/User';
import { IGoalCard } from './items/goal-cards/goal-cards.component';

declare var lscache: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    public user: User;

    gcSales:IGoalCard = {
        title: "Titulo",
        value: 45,
        percent: 20,
        icon: "icon-pie-chart"
    }
    gcOperations:IGoalCard = {
        title: "Titulo",
        value: 45,
        percent: 50,
        icon: "icon-graph"
    }
    gcNewBuildings:IGoalCard = {
        title: "Titulo",
        value: 45,
        percent: 90,
        icon: "icon-home"
    }
    gcNewProspects:IGoalCard = {
        title: "Titulo",
        value: 45,
        percent: 40,
        icon: "icon-user-follow"
    }


    constructor() {
        this.user = lscache.get('user');
    }

    ngOnInit() {

    }

}
