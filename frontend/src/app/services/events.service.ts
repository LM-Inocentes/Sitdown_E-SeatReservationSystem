import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventsInfo } from '../shared/models/EventsInfo';
import { SeatsInfo } from '../shared/models/SeatsInfo';
import { IEvent } from '../shared/interfaces/IEvent';
import { ISeats } from '../shared/interfaces/ISeats';
import { EVENTS_URL, CREATE_EVENTS_URL, CREATE_SEATS_URL,EVENTS_BY_SEARCH_URL, EVENTS_ID_URL, GET_SEATS_URL, UPDATE_SEATS_URL, EVENTS_NAME_URL } from '../shared/constants/urls'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient) { }

  getEvents(): Observable<EventsInfo[]>{
    return this.http.get<EventsInfo[]>(EVENTS_URL);
  }

  getEventsBySearchTerm(searchTerm: string) {
    return this.http.get<EventsInfo[]>(EVENTS_BY_SEARCH_URL + searchTerm);
  }

  getSeats(eventName: string): Observable<SeatsInfo[]>{
    return this.http.get<SeatsInfo[]>(GET_SEATS_URL + eventName);
  }

  getSeatNo(eventName: string, SeatNo:number): Observable<SeatsInfo>{
    return this.http.get<SeatsInfo>(GET_SEATS_URL + eventName + '/' + SeatNo);
  }

  getEventsID(eventID:string):Observable<EventsInfo>{
    return this.http.get<EventsInfo>(EVENTS_ID_URL + eventID);
  }

  getEventName(eventName:string):Observable<EventsInfo>{
    return this.http.get<EventsInfo>(EVENTS_NAME_URL + eventName);
  }
  
  createEvent(eventCreate :IEvent): Observable<EventsInfo>{
    return this.http.post<EventsInfo>(CREATE_EVENTS_URL, eventCreate);
  }

  createSeats(seatsCreate :ISeats): Observable<SeatsInfo>{
    return this.http.post<SeatsInfo>(CREATE_SEATS_URL, seatsCreate);
  }

  updateSeat(seat :ISeats): Observable<SeatsInfo>{
    return this.http.patch<SeatsInfo>(UPDATE_SEATS_URL, seat);
  }

}