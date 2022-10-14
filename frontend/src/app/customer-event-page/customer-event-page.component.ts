import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EventsService } from '../services/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-event-page',
  templateUrl: './customer-event-page.component.html',
  styleUrls: ['./customer-event-page.component.css']
})
export class CustomerEventPageComponent implements OnInit {
  event = {} as EventsInfo;

  
  constructor(private activatedRoute:ActivatedRoute, private eventService: EventsService,
     private router: Router) { 
     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
        this.eventService.getEventsID(params.eventID).subscribe(serverEvent => {
        this.event = serverEvent;
      });
    })
  }


  Reserve(){
    this.router.navigateByUrl('/reservation-page');
  }

}
