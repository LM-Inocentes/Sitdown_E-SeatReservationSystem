import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SeatsComponent } from './seats/seats.component';
import { SignupComponent } from './signup/signup.component';
import { EventPageComponent } from './event-page/event-page.component';
import { EventListComponent } from './event-list/event-list.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';


const routes: Routes = [
    {path : 'landing-page', component : LandingpageComponent},
    {path : 'login', component : LoginComponent},
    {path : 'sign-up', component : SignupComponent},
    {path : 'event-page', component : EventPageComponent},
    {path : 'event-list', component : EventListComponent},
    {path : 'reservation-page', component : ReservationPageComponent}
  ];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }