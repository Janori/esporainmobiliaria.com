import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-goal-cards',
  templateUrl: './goal-cards.component.html',
  styleUrls: ['./goal-cards.component.css']
})
export class GoalCardsComponent implements OnInit {
  @Input()
  public data:IGoalCard = {
      title: "Titulo",
      value: 45,
      percent: 70,
      icon: "icon-pie-chart",
      data: null
  }

  constructor() { }



  ngOnInit() {
  }

}

export interface IGoalCard{
  title:String,
  value:Number,
  percent:Number,
  icon:String,
  data: any
}
