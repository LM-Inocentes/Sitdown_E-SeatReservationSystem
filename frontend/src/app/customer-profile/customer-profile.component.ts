import { Component, OnInit } from '@angular/core';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  events: EventsInfo[] = [];
  showImage = true;

  constructor(private eventService: EventsService) { 
    let EventsObservable: Observable<EventsInfo[]>;
    
    EventsObservable = eventService.getEvents();
    EventsObservable.subscribe((serverEvents) => {
      this.events = serverEvents;
    })
  }

  ngOnInit(): void {
  }

  

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  sendSelectedEvent(eventID: number) 
  {
    alert(eventID);
  }
}
