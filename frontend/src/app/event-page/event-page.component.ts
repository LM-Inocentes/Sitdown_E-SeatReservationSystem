import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})

export class EventPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

  EventName: string = 'Cebu Aurora Fest';
  EventLoc: string = 'SRP Road, Cebu City';
  EventAbout: string = 'After two years of hiatus due to the pandemic, Aurora Music Festival in Cebu is giving us the sign to feel once again the fun, enjoy and appreciate some great music from the different bands.';
}