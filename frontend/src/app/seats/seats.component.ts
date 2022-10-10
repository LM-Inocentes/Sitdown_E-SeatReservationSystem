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
  Col!:number;

  constructor( activatedRoute:ActivatedRoute, eventService: EventsService,
    private router: Router) { 
    activatedRoute.params.subscribe((params) => {
      eventService.getSeats(params.eventName).subscribe(serverSeats => {
        this.seats = serverSeats;
        this.Col = params.eventSeatCol;
      });
    })
    
  }

  ngOnInit(): void {
  }

  ButtonClick(SeatNo:number){
    this.isSeatsClicked = true;
    console.log(this.seats[SeatNo-1]);
    window.open ("http://localhost:4200/",
"mywindow","menubar=1,resizable=1,width=350,height=250");
  }
  Rowdiv(SeatNo:number){
    if(SeatNo%this.Col== 1){
      return true;
    }
    else{
      return false;
    }
  }

}
