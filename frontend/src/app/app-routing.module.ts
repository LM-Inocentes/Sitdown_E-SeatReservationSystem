import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SeatsComponent } from './seats/seats.component';
import { RegisterComponent } from './register/register';
import { CustomerEventListComponent } from './customer-event-list/customer-event-list.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { EventCreationComponent } from './event-creation/event-creation.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { CustomerEventPageComponent } from './customer-event-page/customer-event-page.component';

const routes: Routes = [
    {path : '', component : LandingpageComponent},
    {path : 'login', component : LoginComponent},
    {path : 'register', component : RegisterComponent},
    {path : 'customer-event-list', component : CustomerEventListComponent},
    {path : 'search/:searchTerm', component : CustomerEventListComponent},
    {path : 'customer-profile', component : CustomerProfileComponent},
    {path : 'event-creation', component : EventCreationComponent},
    {path: 'customer-event-list/:eventID', component : CustomerEventPageComponent},
    {path: 'seats/:eventName/:eventSeatCol', component : SeatsComponent},
    {path : 'reservation/:eventName/:SeatNo', component : ReservationFormComponent},
  ];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }