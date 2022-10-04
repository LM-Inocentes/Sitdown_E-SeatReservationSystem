import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SeatsComponent } from './seats/seats.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RegisterComponent } from './register/register';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { EventPageComponent } from './event-page/event-page.component';
import { EventListComponent } from './event-list/event-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EventCreationComponent } from './event-creation/event-creation.component';
import { HeaderComponent } from './header/header.component';
import { CustomerEventListComponent } from './customer-event-list/customer-event-list.component';
import { SearchComponent } from './search/search.component';
import { InputContainerComponent } from './input/input-container/input-container.component';
import { InputValidationComponent } from './input/input-validation/input-validation.component';
import { TextInputComponent } from './input/text-input/text-input.component';
import { InputLoadingComponent } from './input/input-loading/input-loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeatsComponent,
    LandingpageComponent,
    RegisterComponent,
    ReservationFormComponent,
    EventPageComponent,
    ReservationPageComponent,
    FileUploadComponent,
    EventListComponent,
    AdminPageComponent,
    EventCreationComponent,
    HeaderComponent,
    CustomerEventListComponent,
    SearchComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    InputLoadingComponent,
    CustomerProfileComponent,
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
