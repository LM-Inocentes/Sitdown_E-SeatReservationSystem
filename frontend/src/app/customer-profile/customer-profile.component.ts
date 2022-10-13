import { Component, OnInit } from '@angular/core';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';
import { ReservationsService } from '../services/reservations.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';
import { Reservations } from '../shared/models/Reservations';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  user!:User;
  events: EventsInfo[] = [];
  userReservations: Reservations[] = [];
  showImage = true;

  constructor(eventService: EventsService, reservationService: ReservationsService, userService:UserService) { 
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    reservationService.getUserReservations(this.user.email).subscribe(serverReservations => {
      this.userReservations = serverReservations;
    });
  }

  ngOnInit(): void {
  }

  

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  sendSelectedEvent(eventID: number) 
  {
    alert(eventID);
  }
}
