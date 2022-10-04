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
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AdminEventListComponent } from './admin-event-list/admin-event-list.component';
import { AdminEventCreateComponent } from './admin-event-create/admin-event-create.component';
import { EventCreationComponent } from './event-creation/event-creation.component';
import { AuthGuard } from './services/auth-guard.guard';

const routes: Routes = [
    {path : '', component : LandingpageComponent},
    {path : 'login', component : LoginComponent},
    {path : 'register', component : RegisterComponent},
    {path : 'event-page', component : EventPageComponent, canActivate: [AuthGuard]},
    {path : 'event-list', component : EventListComponent , canActivate: [AuthGuard]},
    {path : 'reservation-page', component : ReservationPageComponent , canActivate: [AuthGuard]},
    {path : 'customer-event-list', component : CustomerEventListComponent , canActivate: [AuthGuard]},
    {path : 'search/:searchTerm', component : CustomerEventListComponent , canActivate: [AuthGuard]},
    {path : 'customer-profile', component : CustomerProfileComponent , canActivate: [AuthGuard]},
    {path : 'admin-event-list', component : AdminEventListComponent , canActivate: [AuthGuard]},
    {path : 'admin-event-create', component : AdminEventCreateComponent , canActivate: [AuthGuard]},
    {path : 'event-creation', component : EventCreationComponent , canActivate: [AuthGuard]},
  ];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }