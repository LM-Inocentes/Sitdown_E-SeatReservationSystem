import { Component, OnInit } from '@angular/core';

interface Seats{
  SeatNo: number;
  isAvailable: boolean;
  img: string;
  Name: string;
  ReservedDate: Date;
  imgPayment: string;
}

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
  TotalSeats: number = 100;
  Col: number = 30;
  Row: number = 4;
  ImgSeat: string = './assets/Available.png';
  seatString: string = '';
  i: number = 1;
  j: number = 1;
  isShowingSeats: boolean = true;
  isSeatsClicked: boolean = false;

  seats:Seats[] = [];

  constructor() { }

  ngOnInit(): void {
    var pushseats:Seats;
   
    for(; this.j<=this.TotalSeats; this.j++){
        pushseats = {SeatNo: this.j+((this.i-1)*this.Col), isAvailable: true, img:this.ImgSeat, Name:'' , ReservedDate: new Date(), imgPayment:''}; 
        this.seats.push(pushseats); 
        console.log(this.seats[this.j-1]);
    }
  }

  ButtonClick(SeatNo:number){
    this.isSeatsClicked = true;
    console.log(this.seats[SeatNo-1]);
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
