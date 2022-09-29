import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SeatsComponent } from './seats/seats.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignupComponent } from './signup/signup.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { EventPageComponent } from './event-page/event-page.component';
import { EventListComponent } from './event-list/event-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EventCreationComponent } from './event-creation/event-creation.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeatsComponent,
    LandingpageComponent,
    SignupComponent,
    ReservationFormComponent,
    EventPageComponent,
    ReservationPageComponent,
    FileUploadComponent,
    EventListComponent,
    AdminPageComponent,
    EventCreationComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
