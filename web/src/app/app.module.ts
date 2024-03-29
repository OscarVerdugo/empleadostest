import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './pages/form/form.component';
import { ApiService } from "./services/api/api.service";
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MainComponent } from './pages/main/main.component';
import { ContentComponent } from './pages/content/content.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventEmitterService } from "../app/services/event-emitter.service";
import { NonePipe } from './util/none.pipe';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/authentication/auth.service';
import { Keys } from "./services/api/keys";
import { AlertComponent } from './components/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IncidenceFormComponent } from './pages/incidence-form/incidence-form.component';
import { ViewIncidencesComponent } from './pages/view-incidences/view-incidences.component';
import { EstadoPipe } from './util/estado-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SidebarComponent,
    MainComponent,
    ContentComponent,
    NavbarComponent,
    NonePipe,
    LoginComponent,
    AlertComponent,
    IncidenceFormComponent,
    ViewIncidencesComponent,
    EstadoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService,EventEmitterService,AuthService,Keys],
  bootstrap: [AppComponent]
})
export class AppModule { }
