import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//
// import {
	// AdminIndexComponent,
	// DashboardComponent,
// 	RegionsIndexComponent,
// 	RegionShowComponent,
// 	RegionEditComponent,
// 	RegionCreateComponent,
// 	StaffIndexComponent,
// 	StaffShowComponent,
// 	StaffCreateComponent,
// 	StaffEditComponent,
// 	PartnerIndexComponent,
// 	PartnerShowComponent,
// 	PartnerCreateComponent,
// 	PartnerEditComponent,
// 	PreferentialIndexComponent,
//     PreferentialShowComponent,
//     PreferentialCreateComponent,
//     PreferentialEditComponent,
// 	LoginComponent
// } from './components';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AgentesComponent } from './dashboard/agentes/agentes.component';

const appRoutes : Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'agentes', component: AgentesComponent },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', component: HomeComponent }
];

export const appRoutingProviders: Array<any> = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
