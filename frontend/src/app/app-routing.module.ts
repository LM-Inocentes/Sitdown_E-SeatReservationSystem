import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SeatsComponent } from './seats/seats.component';
import { RegisterComponent } from './register/register';
import { EventPageComponent } from './event-page/event-page.component';
import { EventListComponent } from './event-list/event-list.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { CustomerEventListComponent } from './customer-event-list/customer-event-list.component';


const routes: Routes = [
    {path : 'landing-page', component : LandingpageComponent},
    {path : 'login', component : LoginComponent},
    {path : 'register', component : RegisterComponent},
    {path : 'event-page', component : EventPageComponent},
    {path : 'event-list', component : EventListComponent},
    {path : 'reservation-page', component : ReservationPageComponent},
    {path : 'customer-event-list', component : CustomerEventListComponent},
    {path : 'search/:searchTerm', component : CustomerEventListComponent}
  ];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }