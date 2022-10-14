import { Component, OnInit } from '@angular/core';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';
import { ReservationsService } from '../services/reservations.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';
import { Reservations } from '../shared/models/Reservations';
import { IReservations } from '../shared/interfaces/IReservations';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  user!:User;
  userReservations: Reservations[] = [];
  showImage = true;

  constructor(private eventService: EventsService, private reservationService: ReservationsService, userService:UserService) { 
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    if(this.user.isAdmin){
      reservationService.getReservations().subscribe(serverReservations => {
        this.userReservations = serverReservations;
      });
    }
    else{
      reservationService.getUserReservations(this.user.email).subscribe(serverReservations => {
        this.userReservations = serverReservations;
      });
    }
  }

  ngOnInit(): void {
  }

  Approve(reservation: IReservations){
    this.reservationService.adminApproveReservations(reservation).subscribe();
    this.eventService.adminApproveSeat(reservation).subscribe();
    window.location.reload();
  }

  Reject(reservation: IReservations){
    this.reservationService.adminRejectReservations(reservation).subscribe();
    this.eventService.adminRejectSeat(reservation).subscribe();
    window.location.reload();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
