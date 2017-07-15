import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
      '../../assets/layout/css/layout.min.css',
      '../../assets/layout/css/themes/default.min.css',
      '../../assets/layout/css/custom.min.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('body').attr('class', 'page-container-bg-solid page-header-fixed page-sidebar-closed-hide-logo');
  }

}
