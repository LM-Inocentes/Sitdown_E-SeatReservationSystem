import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from '../services/events.service';
import { EventsInfo } from '../shared/models/EventsInfo';

@Component({
  selector: 'app-customer-event-list',
  templateUrl: './customer-event-list.component.html',
  styleUrls: ['./customer-event-list.component.css']
})
export class CustomerEventListComponent implements OnInit {

  events: EventsInfo[] = [];
  constructor(private eventService:EventsService, activatedRoute: ActivatedRoute) { 
    let EventsObservable: Observable<EventsInfo[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm){
        EventsObservable = this.eventService.getEventsBySearchTerm(params.searchTerm);
      }
      else{
        EventsObservable = eventService.getEvents();
      }
    EventsObservable.subscribe((serverEvents) => {
      this.events = serverEvents;
    })
  }) 
  }

  ngOnInit(): void {
  }

  sendSelectedEvent(eventID: number) 
  {
    alert("EventID: " + eventID);
    //send selected event ID to database
  }
}
