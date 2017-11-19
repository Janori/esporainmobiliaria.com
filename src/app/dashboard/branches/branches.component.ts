import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../shared/services';
import { User, Branch } from '../../shared/model';
import { Subject } from 'rxjs/Rx';

declare var bootbox: any;

@Component({
    selector: 'app-branches',
    templateUrl: './branches.component.html',
    providers: [ BranchService ]
})
export class BranchesComponent implements OnInit {
    public branches: Branch[];

    public dtOptions: DataTables.Settings = {
        language: { url: 'assets/DatatablesSpanish.json' },
        destroy: true
    };
    public dtTrigger: Subject<any> = new Subject<any>();

    constructor(
        private _branchService: BranchService
    ) { }

    ngOnInit() {
        this.getAllBranches();
    }

    getAllBranches = () => {
        this._branchService.getAllBranches().subscribe(
            result => {
                this.branches = result.data;

                this.branches.forEach((branch, i, branches) => {
                    branches[i] = new Branch(branch);
                    branches[i].users.forEach((user, j, users) => users[i] = new User(user));
                });

                this.dtTrigger.next();

            },
            error => {
                console.log(error);
                alert('Hay un error en la petición');
            }
        )
    }

    deleteBranch = (id: Number) => {
        var self = this;
        bootbox.confirm({
            message: "¿Está seguro que desea eliminar esta sucursal?",
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
                    self._branchService.deleteBranch(id).subscribe(
                        result => {
                            bootbox.alert(result.msg);
                            self.getAllBranches();
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
