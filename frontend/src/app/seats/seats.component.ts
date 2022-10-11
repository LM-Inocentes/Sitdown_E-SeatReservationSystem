import { Component, Input, OnInit } from '@angular/core';
import { SeatsInfoService } from 'src/app/services/seats-info.service';
import { SeatsInfo } from '../shared/models/SeatsInfo';
import { EventsService } from '../services/events.service';
import { EventsInfo } from '../shared/models/EventsInfo';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';


@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  user!:User;
  isSeatsClicked: boolean = false;
  seats:SeatsInfo[] = [];
  Col!:number;
  isAdmin: boolean = true;

  constructor( activatedRoute:ActivatedRoute, eventService: EventsService,
    private router: Router, private userService:UserService) { 
    activatedRoute.params.subscribe((params) => {
      eventService.getSeats(params.eventName).subscribe(serverSeats => {
        this.seats = serverSeats;
        this.Col = params.eventSeatCol;
      });
    })
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      this.isAdmin = this.user.isAdmin;
      console.log(this.isAdmin );
    });
    
  }

  ngOnInit(): void {
    console.log(this.isAdmin );
    console.log(this.user);
  }

  ButtonClick(SeatNo:number){
    this.isSeatsClicked = true;
    console.log(this.seats[SeatNo-1]);
    window.open ("http://localhost:4200/reservation-form/"+SeatNo.toString()+"/"+SeatNo.toString(),
"mywindow","menubar=no,width=350,height=800");
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
