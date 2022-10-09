import { Component, OnInit } from '@angular/core';
import { SeatsInfoService } from 'src/app/services/seats-info.service';
import { SeatsInfo } from '../shared/models/SeatsInfo';
import { EventsService } from '../services/events.service';
import { EventsInfo } from '../shared/models/EventsInfo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  isSeatsClicked: boolean = false;
  seats:SeatsInfo[] = [];
  event!: EventsInfo;

  constructor( private eventsService: EventsService) { 
    let SeatsObservable: Observable<SeatsInfo[]>;
    this.event = eventsService.getCurrentEvent();
    SeatsObservable = eventsService.getSeats("Test");
    SeatsObservable.subscribe((serverSeats) => {
      this.seats = serverSeats;
    })
  }

  ngOnInit(): void {

  }

  ButtonClick(SeatNo:number){
    this.isSeatsClicked = true;
    console.log(this.seats[SeatNo-1]);
  }
  Rowdiv(SeatNo:number){
    if(SeatNo%50== 1){
      return true;
    }
    else{
      return false;
    }
  }

}
