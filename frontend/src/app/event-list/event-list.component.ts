import { Component, OnInit } from '@angular/core';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';

//Events data are retrieved from backend api

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
      console.log(this.events);
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
  sendSelectedEvent(eventID: number) 
  {
    alert(eventID);
  }
}
