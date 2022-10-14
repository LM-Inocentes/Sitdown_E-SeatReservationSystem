import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from '../services/events.service';
import { UserService } from '../services/user.service';
import { EventsInfo } from '../shared/models/EventsInfo';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-customer-event-list',
  templateUrl: './customer-event-list.component.html',
  styleUrls: ['./customer-event-list.component.css']
})
export class CustomerEventListComponent implements OnInit {
  
  user!:User;
  events: EventsInfo[] = [];

  constructor(private eventService:EventsService, activatedRoute: ActivatedRoute, userService: UserService) { 
    let EventsObservable: Observable<EventsInfo[]>;

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });

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
