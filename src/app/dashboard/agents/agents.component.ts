import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { User } from '../../shared/User';

@Component({
    selector: 'app-agents',
    templateUrl: './agents.component.html',
})

export class AgentsComponent implements OnInit {
    // dtOptions: DataTables.Settings = {};
    users: User[] = [
        new User({
            id: 1,
            name: 'Jonathan',
            first_surname: 'Oropeza',
            second_surname: 'Mendez'
        }),
        new User({
            id: 2,
            name: 'Edgar',
            first_surname: 'Sandoval',
            second_surname: 'Avalos'
        })
    ];

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    // dtTrigger: Subject<any> = new Subject<any>();

    constructor() {

    }

    ngOnInit() {
    }

}
