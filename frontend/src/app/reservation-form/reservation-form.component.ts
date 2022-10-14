
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { IReservations } from '../shared/interfaces/IReservations';
import { User } from '../shared/models/User';
import { SeatsInfo } from '../shared/models/SeatsInfo';
import { UserService } from '../services/user.service';
import { ISeats } from '../shared/interfaces/ISeats';
import { ReservationsService } from '../services/reservations.service';
import { EventsInfo } from '../shared/models/EventsInfo';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  user!:User;
  reservationForm!:FormGroup;
  isSubmitted = false;
  seat = {} as SeatsInfo;
  event = {} as EventsInfo;
  returnUrl!: string;

  constructor(private formBuilder:FormBuilder, activatedRoute:ActivatedRoute, userService:UserService, 
    private reservationService: ReservationsService, private eventService:EventsService, private router:Router) { 
      
      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      });

      activatedRoute.params.subscribe((params) => {
        eventService.getSeatNo(params.eventName, params.SeatNo).subscribe(serverSeats => {
          this.seat = serverSeats;
        });
        eventService.getEventName(params.eventName).subscribe(serverEvent => {
          this.event = serverEvent;
          this.returnUrl = 'seats/'+this.event.eventName+'/'+ this.event.eventSeatCol.toString();
        });
      })
     }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      Name: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  get form()
  {
    return this.reservationForm.controls;
  }
  
  submit(){
    
    this.isSubmitted = true;
    if(this.reservationForm.invalid) return;

    const fv= this.reservationForm.value;

    const reservations :IReservations = {
      userEmail: this.user.email,
      eventName: this.event.eventName,
      seatNo: this.seat.SeatNo,
      Name: fv.Name,
      date: fv.date,
      cost: this.event.eventCost,
      paymentImg: '',
      isApproved: "Pending",
      TicketID: "none"
    };

    this.reservationService.createReservation(reservations)
    .subscribe(_ => this.router.navigateByUrl(this.returnUrl));

    const seat : ISeats = {
      eventName: this.event.eventName,
      SeatNo: this.seat.SeatNo,
      isAvailable: false,
      img: './assets/Reserved.png',
      Name: fv.Name,
      ReservedDate: fv.date,
      imgPayment: "",
    };

    this.eventService.updateSeat(seat)
    .subscribe(_ => this.router.navigateByUrl(this.returnUrl));

    this.event.eventSeatAvail -= 1;
    this.eventService.updateEvent(this.event)
    .subscribe(_ => this.router.navigateByUrl(this.returnUrl));
  }

  onFileSelect(event: any) {
  }


}
