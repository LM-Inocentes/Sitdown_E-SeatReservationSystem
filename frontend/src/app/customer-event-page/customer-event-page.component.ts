import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EventsService } from '../services/events.service';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';
import { SeatsInfo } from '../shared/models/SeatsInfo';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-customer-event-page',
  templateUrl: './customer-event-page.component.html',
  styleUrls: ['./customer-event-page.component.css']
})
export class CustomerEventPageComponent implements OnInit {
  event = {} as EventsInfo;
  user!:User;
  
  constructor(private activatedRoute:ActivatedRoute, private eventService: EventsService,
     private router: Router, private userService: UserService, private reservationService: ReservationsService) { 
     }

  ngOnInit(): void {
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    this.activatedRoute.params.subscribe((params) => {
        this.eventService.getEventsID(params.eventID).subscribe(serverEvent => {
        this.event = serverEvent;
      });
    })
  }


  eventDelete(){
    this.eventService.deleteEvent(this.event.eventID)
      .subscribe(_ => this.router.navigateByUrl('/customer-event-list'));

    this.eventService.deleteSeats(this.event.eventName)
      .subscribe(_ => this.router.navigateByUrl('/customer-event-list'));
      
    this.reservationService.adminEventDelete(this.event.eventName)
      .subscribe(_ => this.router.navigateByUrl('/customer-event-list'));
  }

}
