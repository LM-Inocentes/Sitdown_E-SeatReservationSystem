import { Component, OnInit } from '@angular/core';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EventsService } from '../services/events.service';
import { EventsL } from './events';
import { Observable } from 'rxjs';

/*
interface EventsL{
  eventID: number;
  eventName: string;
  eventDate: string;
  eventLoc: string;
  eventSeatTotal: number;
  eventSeatCol: number;
  eventSeatAvail: number;
  eventCost: number;
  eventAbout: string;
  eventImg: string;
}
*/
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {

  events: EventsInfo[] = [];

  constructor(private eventService: EventsService) { 
    let EventsObservable: Observable<EventsInfo[]>;
    
    EventsObservable = eventService.getEvents();
    EventsObservable.subscribe((serverEvents) => {
      this.events = serverEvents;
    })
  }

  ngOnInit(): void {
  }

  pageTitle = 'Dynamic! Game List';
  imageWidth = 45;
  imageMargin = 1;
  showImage = true;

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
