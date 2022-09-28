import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  cost:number = 400;
  onFileSelected(event: any){
    console.log(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
