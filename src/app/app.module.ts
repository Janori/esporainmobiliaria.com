import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders} from './app.routing';
import { AuthService } from './shared/security/auth.service';
import { AuthGuard } from './shared/security/auth.guard';
import { EnumWsPipe } from './pipes/enum-ws.pipe';

import { DataTablesModule } from 'angular-datatables';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { AgmCoreModule } from "@agm/core";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    AgentsComponent,
    AgentEditComponent,
    BranchesComponent,
    BranchOfficeEditComponent,
    BranchOfficeCreateComponent,
    BuildingsComponent,
    BuildingEditComponent,
    BuildingCreateComponent,
    BuildingDetailComponent,
    UsersComponent,
    UserEditComponent,
    UserCreateComponent,
    EnumWsPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBUcyScyduTrgebqcKkOPL-WMlokSYIu4k",
      libraries: ["places"]
    }),
    NguiAutoCompleteModule,
    routing
  ],
  providers: [appRoutingProviders, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
