import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { IEvent } from '../shared/interfaces/IEvent';
import { ISeats } from '../shared/interfaces/ISeats';
import { SeatsInfo } from '../shared/models/SeatsInfo';


@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit {

  eventForm!:FormGroup;
  isSubmitted = false;
  returnUrl = 'customer-event-list';
  imageData!: string;
  fileName = '';
  seats:SeatsInfo[] = [];


  constructor(private formBuilder:FormBuilder, private eventService: EventsService, 
    private activatedRoute:ActivatedRoute, private router:Router, private http: HttpClient) { }

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
      eventImg: '',
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

  onFileSelect(event: any) {
    if (!event.target.files) return;
    const file = (event.target as HTMLInputElement).files![0];
    this.eventForm.patchValue({ eventImg: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
        console.log(this.imageData);
      };
      reader.readAsDataURL(file);
    }
  } 

}

