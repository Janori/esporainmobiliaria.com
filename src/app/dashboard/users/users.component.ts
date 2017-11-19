import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services';
import { User } from '../../shared/model/User';
import { Subject } from 'rxjs/Rx';

declare var bootbox: any;
declare var lscache: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [ UserService ]
})

export class UsersComponent implements OnInit {
    public users: User[];

    public dtOptions: DataTables.Settings = {
        language: { url: 'assets/DatatablesSpanish.json' },
        destroy: true
    };
    public dtTrigger: Subject<any> = new Subject<any>();

    constructor(
      private _userService: UserService
    ) { }

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        this._userService.getAllUsers().subscribe(
            result => {
                this.users = result.data;

                for(var i = 0; i < this.users.length; i++)
                   this.users[i] = new User(this.users[i]);

                 this.dtTrigger.next();

            },
            error => {
                console.log(error);
                alert('Hay un error en la petición');
            }
        )
    }

    deleteUser = (id: Number) => {
        if(id == lscache.get('user').id) {
            bootbox.alert('No es posible eliminarse a sí mismo.');
            return;
        }
        var self = this;
        bootbox.confirm({
            message: "¿Está seguro que desea eliminar este usuario?",
            buttons: {
                confirm: {
                    label: 'Sí',
                    className: 'btn-danger'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if(result) {
                    self._userService.deleteUser(id).subscribe(
                        result => {
                            bootbox.alert(result.msg);
                            self.getAllUsers();
                        },
                        error => {
                            console.log(error);
                            alert('Hay un error en la petición');
                        }
                    )
                }
            }
        });
    }

}
