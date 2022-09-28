
export class SeatsInfoService {
    ImgSeat: string = './assets/Available.png';
    seatString: string = '';
    i: number = 1;
    j: number = 1;
    TotalSeats: number = 50;
    Col: number = 10;
  
    seats:any[] = [];
   
    constructor() { }
  
    getSeats():any[]{
      var pushseats:any;
     
      for(; this.j<=this.TotalSeats; this.j++){
          pushseats = {TotalSeats: this.TotalSeats, Col: this.Col, SeatNo: this.j+((this.i-1)*this.Col), isAvailable: true, img:this.ImgSeat, Name:'' , ReservedDate: new Date(), imgPayment:''}; 
          this.seats.push(pushseats); 
          console.log(this.seats[this.j-1]);
      }
      return this.seats;
    }
  }
