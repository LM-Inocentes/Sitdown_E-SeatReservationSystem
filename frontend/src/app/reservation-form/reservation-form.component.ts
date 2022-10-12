import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { IReservations } from '../shared/interfaces/IReservations';
import { User } from '../shared/models/User';
import { Location } from '@angular/common'
import { SeatsInfo } from '../shared/models/SeatsInfo';
import { UserService } from '../services/user.service';
import { ISeats } from '../shared/interfaces/ISeats';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  user!:User;
  eventName!: string;
  isAdmin!: boolean;
  reservationForm!:FormGroup;
  isSubmitted = false;
  seat!: SeatsInfo;
  Col!: number;

  constructor(private formBuilder:FormBuilder, activatedRoute:ActivatedRoute, private location: Location, 
    userService:UserService, private reservationService: ReservationsService, private eventService:EventsService, private router:Router) { 
      
      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
        this.isAdmin = this.user.isAdmin;
      });

      activatedRoute.params.subscribe((params) => {
        eventService.getSeatNo(params.eventName, params.SeatNo).subscribe(serverSeats => {
          this.seat = serverSeats;
          this.eventName = params.eventName;
          this.Col = params.Col;
        });
      })
     }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      Name: ['', Validators.required],
      date: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
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
      eventName: this.eventName,
      seatNo: this.seat.SeatNo,
      Name: fv.Name,
      date: fv.date,
      cost: 100,
      paymentImg: '',
    };

    this.reservationService.createReservation(reservations)
    .subscribe(_ => this.router.navigateByUrl('seats/'+this.eventName+'/'+ this.Col.toString()));

    const seat : ISeats = {
      eventName: this.eventName,
      SeatNo: this.seat.SeatNo,
      isAvailable: false,
      img: './assets/Reserved.png',
      Name: fv.Name,
      ReservedDate: fv.date,
      imgPayment: "",
    };

    this.eventService.updateSeat(seat)
    .subscribe(_ => this.router.navigateByUrl('seats/'+this.eventName+'/'+ this.Col.toString()));
  }

  onFileSelect(event: any) {
  }


}
