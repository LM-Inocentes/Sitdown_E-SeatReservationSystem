import { Component, OnInit } from '@angular/core';
import { SeatsInfoService } from 'src/app/services/seats-info.service';
import { SeatsInfo } from '../shared/models/SeatsInfo';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  isSeatsClicked: boolean = false;

  seats:SeatsInfo[] = [];

  constructor(private seatsInfoService:SeatsInfoService ) { 
    this.seats = seatsInfoService.getSeats();
  }

  ngOnInit(): void {

  }

  ButtonClick(SeatNo:number){
    this.isSeatsClicked = true;
    console.log(this.seats[SeatNo-1]);
  }
  Rowdiv(SeatNo:number, Col:any){
    if(SeatNo%Col== 1){
      return true;
    }
    else{
      return false;
    }
  }

}
