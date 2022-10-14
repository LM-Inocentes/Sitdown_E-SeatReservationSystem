import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventsInfo } from '../shared/models/EventsInfo';
import { SeatsInfo } from '../shared/models/SeatsInfo';
import { IEvent } from '../shared/interfaces/IEvent';
import { ISeats } from '../shared/interfaces/ISeats';
import { EVENTS_URL, CREATE_EVENTS_URL, CREATE_SEATS_URL,EVENTS_BY_SEARCH_URL, EVENTS_ID_URL, GET_SEATS_URL, UPDATE_SEATS_URL, EVENTS_NAME_URL, ADMIN_APPROVE_SEATS_URL, ADMIN_REJECT_SEATS_URL, DELETE_EVENTS_URL, DELETE_SEATS_URL, UPDATE_EVENTS_URL } from '../shared/constants/urls'
import { IReservations } from '../shared/interfaces/IReservations';

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

  updateEvent(event :IEvent): Observable<EventsInfo>{
    return this.http.patch<EventsInfo>(UPDATE_EVENTS_URL, event);
  }

  deleteEvent(eventID:number){
    return this.http.delete(DELETE_EVENTS_URL + eventID);
  }

  createSeats(seatsCreate :ISeats): Observable<SeatsInfo>{
    return this.http.post<SeatsInfo>(CREATE_SEATS_URL, seatsCreate);
  }

  deleteSeats(eventName:string){
    return this.http.delete(DELETE_SEATS_URL + eventName);
  }

  updateSeat(seat :ISeats): Observable<SeatsInfo>{
    return this.http.patch<SeatsInfo>(UPDATE_SEATS_URL, seat);
  }

  adminApproveSeat(reservation :IReservations): Observable<SeatsInfo>{
    return this.http.patch<SeatsInfo>(ADMIN_APPROVE_SEATS_URL, reservation);
  }

  adminRejectSeat(reservation :IReservations): Observable<SeatsInfo>{
    return this.http.patch<SeatsInfo>(ADMIN_REJECT_SEATS_URL, reservation);
  }

}