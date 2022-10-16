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
  {path : '', title: 'Home', component : LandingpageComponent},
  {path : 'login',title: 'Login',  component : LoginComponent},
  {path : 'register',title: 'Register',  component : RegisterComponent},
  {path : 'customer-event-list',title: 'Events',  component : CustomerEventListComponent},
  {path : 'search/:searchTerm',title: 'Events',  component : CustomerEventListComponent},
  {path : 'customer-profile', title: 'Reservations', component : CustomerProfileComponent},
  {path : 'event-creation',title: 'Create Event',  component : EventCreationComponent},
  {path: 'customer-event-list/:eventID',title: 'Event Page',  component : CustomerEventPageComponent},
  {path: 'seats/:eventName/:eventSeatCol',title: 'Seats',  component : SeatsComponent},
  {path : 'reservation/:eventName/:SeatNo',title: 'Reserve',  component : ReservationFormComponent},
];


// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }