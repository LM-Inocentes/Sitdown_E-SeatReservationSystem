import { Injectable } from '@angular/core';
import { sample_events } from 'src/data';
import { EventsInfo } from '../shared/models/EventsInfo';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  getEvents():EventsInfo[]{
    return sample_events;
  }
}
