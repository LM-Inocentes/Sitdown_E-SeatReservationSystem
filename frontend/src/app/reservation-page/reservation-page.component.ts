import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../services/events.service';
import { EventsInfo } from '../shared/models/EventsInfo';
import { SeatsInfo } from '../shared/models/SeatsInfo';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private eventService: EventsService) { 
    }

  ngOnInit(): void {    
  }

  
}
