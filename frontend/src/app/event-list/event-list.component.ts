import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  sendSelectedEvent(eventID: number) 
  {
    alert(eventID);
    this.sEventID.emit(eventID);
  }

  @Output() sEventID = new EventEmitter<number>();

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