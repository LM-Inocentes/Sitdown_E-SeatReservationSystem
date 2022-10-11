import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { IReservations } from '../shared/interfaces/IReservations';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm!:FormGroup;
  isSubmitted = false;
  returnUrl = 'customer-event-list';

  constructor(private formBuilder:FormBuilder, private eventService: EventsService, 
    private activatedRoute:ActivatedRoute, private router:Router, private http: HttpClient) { }

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
      userEmail: '',
      eventName: '',
      seatNo: 0,
      Name: '',
      date: '',
      cost: 0,
      paymentImg: 'string',
    };
  }

  onFileSelect(event: any) {
  }


}
