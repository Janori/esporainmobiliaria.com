import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services';
import { AuthService } from '../../shared/security/auth.service';
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
      private _userService: UserService,
      private _authService: AuthService
    ) { }

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        this._userService.getAllUsers().subscribe(
            result => {
                this.users = result.data.users;

                for(var i = 0; i < this.users.length; i++)
                   this.users[i] = new User(this.users[i]);

                 this.dtTrigger.next();

            },
            error => {
                console.log(error);
                toastr.error('Hay un error en la petición', '¡Error!');
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
                            toastr.error('Hay un error en la petición', '¡Error!');
                        }
                    )
                }
            }
        });
    }

    loginAsUser(user: User) {
        lscache.set('aminProfile', lscache.get('user'));
        lscache.set('isAdmin', true);
        this._authService.customLogin(user).subscribe(
            result => {
                let data = result.data;
                if(result.status) {
                    toastr.success('¡Exito!', 'Bienvenido ' + data.user.name + ' ' + data.user.first_surname);
                    lscache.set('user', data.user, data.ttl);
                    lscache.set('authToken', data.token, data.ttl);
                    window.location.href = '/';
                }
                else
                  toastr.error('¡Error!', result.msg);
            },
            error => {
                toastr.error('¡Error!', 'Hubo un error en el servidor');
                console.log(error);
                // alert(error.statusText);
            });
    }

}
