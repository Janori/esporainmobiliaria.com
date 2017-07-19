import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { AgentEditComponent } from './dashboard/agents/edit/agent-edit.component';
import { BranchesComponent } from './dashboard/branches/branches.component';
import { BranchOfficeEditComponent } from './dashboard/branches/edit/branch-office-edit.component';
import { BranchOfficeCreateComponent } from './dashboard/branches/create/branch-office-create.component';
import { PropertiesComponent } from './dashboard/properties/properties.component';
import { PropertyEditComponent } from './dashboard/properties/edit/property-edit.component';
import { PropertyCreateComponent } from './dashboard/properties/create/property-create.component';
import { PropertyDetailComponent } from './dashboard/properties/detail/property-detail.component';


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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTablesModule,
    routing
  ],
  providers: [appRoutingProviders, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
