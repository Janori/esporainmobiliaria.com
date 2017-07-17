import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch-office-create',
  templateUrl: '../branch-office-form.component.html',
})
export class BranchOfficeCreateComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Nueva sucursal';
    }

    ngOnInit() {
    }

}
