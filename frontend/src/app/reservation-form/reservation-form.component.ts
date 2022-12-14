
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  
  user!:User;
  reservationForm!:FormGroup;
  isSubmitted = false;
  seat = {} as SeatsInfo;
  event = {} as EventsInfo;
  returnUrl!: string;
  imgName!: string;


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

    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);
    this.eventService.upload(file).subscribe();
    
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
      paymentImg: '/assets/uploads/'+this.imgName,
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

    this.eventService.updateEvent(this.event.eventName, -1)
    .subscribe(_ => this.router.navigateByUrl(this.returnUrl));
  }

  onFileSelect(file:any) {
    this.imgName = file.target.files[0].name;
  }


}
