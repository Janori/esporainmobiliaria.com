import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders} from './app.routing';
import { AuthService } from './shared/security/auth.service';
import { AuthGuard } from './shared/security/auth.guard';

import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AgentsComponent } from './dashboard/agents/agents.component';
import { AgentEditComponent } from './dashboard/agents/agent-edit.component';
import { BranchesComponent } from './dashboard/branches/branches.component';
import { BranchOfficeEditComponent } from './dashboard/branches/edit/branch-office-edit.component';
import { BranchOfficeCreateComponent } from './dashboard/branches/create/branch-office-create.component';
import { PropertiesComponent } from './dashboard/properties/properties.component';
import { PropertyEditComponent } from './dashboard/properties/edit/property-edit.component';
import { PropertyCreateComponent } from './dashboard/properties/create/property-create.component';
import { PropertyDetailComponent } from './dashboard/properties/detail/property-detail.component';
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
    PropertiesComponent,
    PropertyEditComponent,
    PropertyCreateComponent,
    PropertyDetailComponent,
    UsersComponent,
    UserEditComponent,
    UserCreateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTablesModule,
    routing
  ],
  providers: [appRoutingProviders, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
