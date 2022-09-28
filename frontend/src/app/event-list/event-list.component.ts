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

  Events: EventsInfo[] = [];

  constructor(private eventService: EventsService) { 
    let EventsObservable: Observable<EventsInfo[]>;
    
    EventsObservable = eventService.getEvents();
    EventsObservable.subscribe((serverEvents) => {
      this.Events = serverEvents;
    })
  }

  ngOnInit(): void {
  }

  pageTitle = 'Dynamic! Game List';
  imageWidth = 45;
  imageMargin = 1;
  showImage = true;
  events: EventsL[] = [
    {
        "eventID" : 1,
        "eventName" : "Cebu Aurora Fest",
        "eventDate" : "November 19, 2022",
        "eventLoc" : "SRP Road, Cebu City",
        "eventSeatTotal" : 200,
        "eventSeatCol" : 10,
        "eventSeatAvail" : 20,
        "eventCost" : 500,
        "eventAbout" : "yes",
        "eventImg" : "./assets/aurorafest.jpg"
    },
    {
        "eventID" : 2,
        "eventName" : "Otakufest",
        "eventDate" : "November 12, 2022",
        "eventLoc" : "J-Centre Mall, Mandaue City",
        "eventSeatTotal" : 200,
        "eventSeatCol" : 10,
        "eventSeatAvail" : 20,
        "eventCost" : 500,
        "eventAbout" : "yes",
        "eventImg" : "./assets/aurorafest.jpg"
    },
    {
        "eventID" : 3,
        "eventName" : "LM Inocentes' Birthday",
        "eventDate" : "December 25, 2022",
        "eventLoc" : "Il Corso Foods, Cebu City",
        "eventSeatTotal" : 200,
        "eventSeatCol" : 10,
        "eventSeatAvail" : 20,
        "eventCost" : 500,
        "eventAbout" : "yes",
        "eventImg" : "./assets/aurorafest.jpg"
    }
]

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
