import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AgentsComponent } from './dashboard/agents/agents.component';
import { AgentEditComponent } from './dashboard/agents/edit/agent-edit.component';
import { BranchesComponent } from './dashboard/branches/branches.component';
import { BranchOfficeEditComponent } from './dashboard/branches/edit/branch-office-edit.component';
import { BranchOfficeCreateComponent } from './dashboard/branches/create/branch-office-create.component';

const appRoutes : Routes = [
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
            { path: '**', component: HomeComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', component: DashboardComponent }
];

export const appRoutingProviders: Array<any> = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
