import { Component, Input, OnInit } from '@angular/core';
import { SeatsInfoService } from 'src/app/services/seats-info.service';
import { SeatsInfo } from '../shared/models/SeatsInfo';
import { EventsService } from '../services/events.service';
import { EventsInfo } from '../shared/models/EventsInfo';
import { isEmpty, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';


@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
  seats:SeatsInfo[] = [];
  eventName!: string;
  Col!:number;
  user = {} as User;
  isAuth:boolean = this.userService.isAuthenticated();

  constructor( activatedRoute:ActivatedRoute, eventService: EventsService, private userService: UserService) { 
    activatedRoute.params.subscribe((params) => {
      eventService.getSeats(params.eventName).subscribe(serverSeats => {
        this.seats = serverSeats;
        this.Col = params.eventSeatCol;
        this.eventName = params.eventName;
      });
    }) 
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    
  }

  ngOnInit(): void {
    console.log(this.isAuth);
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
