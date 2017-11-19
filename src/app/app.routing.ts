import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/security/auth.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AgentsComponent } from './dashboard/agents/agents.component';
import { AgentEditComponent } from './dashboard/agents/agent-edit.component';
import { BranchesComponent } from './dashboard/branches/branches.component';
import { BranchOfficeEditComponent } from './dashboard/branches/branch-office-edit.component';
import { BranchOfficeCreateComponent } from './dashboard/branches/branch-office-create.component';
import { BuildingsComponent } from './dashboard/buildings/buildings.component';
import { BuildingEditComponent } from './dashboard/buildings/building-edit.component';
import { BuildingCreateComponent } from './dashboard/buildings/building-create.component';
import { BuildingDetailComponent } from './dashboard/buildings/building-detail.component';
import { UsersComponent } from './dashboard/users/users.component';
import { UserEditComponent } from './dashboard/users/user-edit.component';
import { UserCreateComponent } from './dashboard/users/user-create.component';
import { LockscreenComponent } from './dashboard/lockscreen/lockscreen.component';
import { GeolocationComponent } from './dashboard/geolocation/geolocation.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { CustomerFormComponent } from './dashboard/customers/customer-form.component';

const appRoutes : Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'lockscreen', component: LockscreenComponent},
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', component: HomeComponent },
            {
                path: 'agentes',
                children: [
                    { path: '', component: AgentsComponent },
                    { path: ':id/editar', component: AgentEditComponent },
                    { path: 'crear', component: HomeComponent }
                ]
            },
            {
                path: 'sucursales',
                children: [
                    { path: '', component: BranchesComponent },
                    { path: ':id/editar', component: BranchOfficeEditComponent },
                    { path: 'crear', component: BranchOfficeCreateComponent }
                ]
            },
            {
                path: 'inmuebles',
                children: [
                    { path: '', component: BuildingsComponent },
                    { path: 'crear', component: BuildingCreateComponent },
                    { path: ':id', component: BuildingDetailComponent},
                    { path: ':id/editar', component: BuildingEditComponent }
                ],
            },
            {
                path: 'usuarios',
                children: [
                    { path: '', component: UsersComponent },
                    { path: 'crear', component: UserCreateComponent },
                    { path: ':id/editar', component: UserEditComponent }
                ],
            },
            {
                path: 'prospectos',
                children: [
                    { path: '', component: CustomersComponent },
                    { path: 'crear', component: CustomerFormComponent },
                    { path: ':id/editar', component: CustomerFormComponent }
                ],
            },
            {
                path: 'propietarios',
                children: [
                    { path: '', component: CustomersComponent },
                    { path: 'crear', component: CustomerFormComponent },
                    { path: ':id/editar', component: CustomerFormComponent }
                ],
            },
            { path: 'geolocalizacion', component: GeolocationComponent },
            { path: '**', component: HomeComponent }
        ],
        canActivate: [AuthGuard]
    },
    { path: '**', component: DashboardComponent }
];

export const appRoutingProviders: Array<any> = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
