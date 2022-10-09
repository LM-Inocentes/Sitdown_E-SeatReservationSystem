import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-customer-event-page',
  templateUrl: './customer-event-page.component.html',
  styleUrls: ['./customer-event-page.component.css']
})
export class CustomerEventPageComponent implements OnInit {
  event!: EventsInfo;
  
  constructor(activatedRoute:ActivatedRoute, eventService: EventsService,
     private router: Router) { 
      
      activatedRoute.params.subscribe((params) => {
        if(params.eventID)
        eventService.getEventsID(params.eventID).subscribe(serverEvent => {
          this.event = serverEvent;
        });
      })
      eventService.setCurrentEvent(this.event);
     }

  ngOnInit(): void {
  }

  Reserve(){
    this.router.navigateByUrl('/reservation-page');
  }

}
