import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SeatsComponent } from './seats/seats.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
    {path : '', component : LandingpageComponent},
    {path : 'login', component : LoginComponent},
    {path : 'sign-up', component : SignupComponent},
  ];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }