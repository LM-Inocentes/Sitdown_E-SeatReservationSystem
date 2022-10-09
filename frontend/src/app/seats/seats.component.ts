import { Component, Input, OnInit } from '@angular/core';
import { SeatsInfoService } from 'src/app/services/seats-info.service';
import { SeatsInfo } from '../shared/models/SeatsInfo';
import { EventsService } from '../services/events.service';
import { EventsInfo } from '../shared/models/EventsInfo';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  isSeatsClicked: boolean = false;
  seats:SeatsInfo[] = [];

  constructor( activatedRoute:ActivatedRoute, eventService: EventsService,
    private router: Router) { 
    activatedRoute.params.subscribe((params) => {
      eventService.getSeats(params.eventName).subscribe(serverEvent => {
        this.seats = serverEvent;
      });
    })
  }

  ngOnInit(): void {

  }

  ButtonClick(SeatNo:number){
    this.isSeatsClicked = true;
    console.log(this.seats[SeatNo-1]);
  }
  Rowdiv(SeatNo:number){
    if(SeatNo%5== 1){
      return true;
    }
    else{
      return false;
    }
  }

}
