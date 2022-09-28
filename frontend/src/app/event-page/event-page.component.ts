import { Component, Input, OnInit } from '@angular/core';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})

export class EventPageComponent implements OnInit {
  events: EventsInfo[] = [];

  updateEventPageUI(eventID: number): void
  {
    //alert(this.events[1].eventName); //done for test
    this.EventName = this.events[eventID-1].eventName;
    this.EventLoc = this.events[eventID-1].eventLoc;
    this.EventAbout = this.events[eventID-1].eventAbout;
  }

  EventName: string = 'Cebu Aurora Fests';
  EventLoc: string = 'SRP Road, Cebu City';
  EventAbout: string = 'After two years of hiatus due to the pandemic, Aurora Music Festival in Cebu is giving us the sign to feel once again the fun, enjoy and appreciate some great music from the different bands.';
 
  constructor(private eventService: EventsService) { 
    let EventsObservable: Observable<EventsInfo[]>;
    
    EventsObservable = eventService.getEvents();
    EventsObservable.subscribe((serverEvents) => {
      this.events = serverEvents;
    })
  }

  ngOnInit(): void {
    this.updateEventPageUI(2);
  }

}