import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders} from './app.routing';

import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AgentsComponent } from './dashboard/agents/agents.component';
import { AgentEditComponent } from './dashboard/agents/edit/agent-edit.component';
// import { AuthGuard } from './security/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    AgentsComponent,
    AgentEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTablesModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
