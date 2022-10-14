import { Component, OnInit } from '@angular/core';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EventsService } from '../services/events.service';
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
  pending: string = "Pending";
  event = {} as EventsInfo;

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
    console.log(reservation.eventName);
    this.reservationService.adminRejectReservations(reservation).subscribe();
    this.eventService.adminRejectSeat(reservation).subscribe();
    this.eventService.getEventName(reservation.eventName).subscribe(serverEvent => {
      this.event = serverEvent;
      this.event.eventSeatAvail +=1;
      this.eventService.updateEvent(this.event)
        .subscribe();
    });
    window.location.reload();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
