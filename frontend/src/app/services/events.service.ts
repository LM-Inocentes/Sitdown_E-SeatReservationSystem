import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EVENTS_URL } from '../shared/constants/urls';
import { EventsInfo } from '../shared/models/EventsInfo';
import { EVENTS_BY_SEARCH_URL } from '../shared/constants/urls'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventsInfo[]>{
    return this.http.get<EventsInfo[]>(EVENTS_URL);
  }

  getEventsBySearchTerm(searchTerm: string) {
    return this.http.get<EventsInfo[]>(EVENTS_BY_SEARCH_URL + searchTerm);
  }

}
