import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch-office-edit',
  templateUrl: '../branch-office-form.component.html',
})

export class BranchOfficeEditComponent implements OnInit {
    public title: string;
    constructor() {
        this.title = 'Editar sucursal';
    }

    ngOnInit() {
    }

}
