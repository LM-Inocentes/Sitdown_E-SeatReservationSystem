import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { EventsInfo } from '../shared/models/EventsInfo';
import { IEvent } from '../shared/interfaces/IEvent';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit {

  eventForm!:FormGroup;
  isSubmitted = false;
  returnUrl = 'customer-event-list';

  constructor(private formBuilder:FormBuilder, private eventService: EventsService, 
    private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventLoc: ['', Validators.required],
      eventSeatTotal: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      eventSeatCol: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      eventSeatAvail: ['', Validators.required],
      eventCost: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      eventAbout: ['', Validators.required],
      eventImg: ['', Validators.required],
    });

  }

  get form()
  {
    return this.eventForm.controls;
  }

  upload(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    console.log(files);
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
      eventSeatAvail: fv.eventSeatAvail,
      eventCost: fv.eventCost,
      eventAbout: fv.eventAbout,
      eventImg: fv.eventImg,
    };

    this.eventService.createEvent(event).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
