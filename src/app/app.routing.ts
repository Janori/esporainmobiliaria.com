import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/security/auth.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AgentsComponent } from './dashboard/agents/agents.component';
import { AgentEditComponent } from './dashboard/agents/edit/agent-edit.component';
import { BranchesComponent } from './dashboard/branches/branches.component';
import { BranchOfficeEditComponent } from './dashboard/branches/edit/branch-office-edit.component';
import { BranchOfficeCreateComponent } from './dashboard/branches/create/branch-office-create.component';
import { PropertiesComponent } from './dashboard/properties/properties.component';
import { PropertyEditComponent } from './dashboard/properties/edit/property-edit.component';
import { PropertyCreateComponent } from './dashboard/properties/create/property-create.component';
import { PropertyDetailComponent } from './dashboard/properties/detail/property-detail.component';
import { UsersComponent } from './dashboard/users/users.component';
import { UserEditComponent } from './dashboard/users/edit/user-edit.component';
import { UserCreateComponent } from './dashboard/users/create/user-create.component';

const appRoutes : Routes = [
    { path: 'login', component: LoginComponent },
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
                    { path: '', component: PropertiesComponent },
                    { path: 'crear', component: PropertyCreateComponent },
                    { path: ':id', component: PropertyDetailComponent},
                    { path: ':id/editar', component: PropertyEditComponent }
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
            { path: '**', component: HomeComponent }
        ],
        canActivate: [AuthGuard]
    },
    { path: '**', component: DashboardComponent }
];

export const appRoutingProviders: Array<any> = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
