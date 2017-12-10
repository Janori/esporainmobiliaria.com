import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders} from './app.routing';
import { AuthService } from './shared/security/auth.service';
import { AuthGuard } from './shared/security/auth.guard';
import { EnumWsPipe } from './pipes/enum-ws.pipe';
import { KeysPipe } from './pipes/keys.pipe';

import { DataTablesModule } from 'angular-datatables';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { AgmCoreModule } from "@agm/core";
import { MyDatePickerModule } from 'mydatepicker';
import { ImageUploadModule } from 'angular2-image-upload';
import { LightboxModule } from 'angular2-lightbox';
import { CarouselModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { FileUploadModule } from 'ng2-file-upload';
import { SelectModule } from 'ng2-select';

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
import { GoalCardsComponent } from './dashboard/home/items/goal-cards/goal-cards.component';
import { HomeGraphicComponent } from './dashboard/home/items/home-graphic/home-graphic.component';
import { LockscreenComponent } from './dashboard/lockscreen/lockscreen.component';
import { GeolocationComponent } from './dashboard/geolocation/geolocation.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { CustomerFormComponent } from './dashboard/customers/customer-form.component';


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
    GoalCardsComponent,
    HomeGraphicComponent,
    EnumWsPipe,
    KeysPipe,
    LockscreenComponent,
    GeolocationComponent,
    CustomersComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBUcyScyduTrgebqcKkOPL-WMlokSYIu4k",
      libraries: ["places"]
    }),
    ImageUploadModule.forRoot(),
    CarouselModule.forRoot(),
    MyDatePickerModule,
    NguiAutoCompleteModule,
    LightboxModule,
    IonRangeSliderModule,
    FileUploadModule,
    SelectModule,
    routing
  ],
  providers: [appRoutingProviders, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
