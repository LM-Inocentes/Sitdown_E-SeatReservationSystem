
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { IEvent } from '../shared/interfaces/IEvent';
import { SeatsInfo } from '../shared/models/SeatsInfo';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit {

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;

  eventForm!:FormGroup;
  isSubmitted = false;
  returnUrl = 'customer-event-list';
  imageData!: string;
  seats:SeatsInfo[] = [];
  imgName!:string;

  constructor(private formBuilder:FormBuilder, private eventService: EventsService, private router:Router) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventLoc: ['', Validators.required],
      eventSeatTotal: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      eventSeatCol: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      eventSeatAvail: ['',],
      eventCost: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      eventAbout: ['', Validators.required],
      eventImg: [null,],
    });
  }

  get form()
  {
    return this.eventForm.controls;
  }


  submit(){

    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);
    this.eventService.upload(file).subscribe();

    this.isSubmitted = true;
    if(this.eventForm.invalid) return;

    const fv= this.eventForm.value;

    const event :IEvent = {
      eventName: fv.eventName,
      eventDate: fv.eventDate,
      eventLoc: fv.eventLoc,
      eventSeatTotal: fv.eventSeatTotal,
      eventSeatCol: fv.eventSeatCol,
      eventSeatAvail: fv.eventSeatTotal,
      eventCost: fv.eventCost,
      eventAbout: fv.eventAbout,
      eventImg: './assets/uploads/'+this.imgName,
    };

    console.log(event);

    this.eventService.createEvent(event).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })

    this.initSeats(fv.eventName, fv.eventSeatTotal);
    
    for(const seat of this.seats){
        this.eventService.createSeats(seat).subscribe(_ => this.router.navigateByUrl(this.returnUrl));
    }
  }

  initSeats(EventName: string, TotalSeats:number){
    var pushseats:SeatsInfo;
   
    for(let j = 1; j<=TotalSeats; j++){
        pushseats = {eventName: EventName ,SeatNo: j, isAvailable: true, img:'./assets/Available.png', Name: "", ReservedDate:"", imgPayment:""}; 
        this.seats.push(pushseats); 
    }
  }

  onFileSelect(file:any) {
    this.imgName = file.target.files[0].name;
  }
}

