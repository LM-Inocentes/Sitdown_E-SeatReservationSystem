import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EVENTS_URL } from '../shared/constants/urls';
import { EventsInfo } from '../shared/models/EventsInfo';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventsInfo[]>{
    return this.http.get<EventsInfo[]>(EVENTS_URL);
  }
}
