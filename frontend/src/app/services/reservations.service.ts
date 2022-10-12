import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Reservations } from '../shared/models/Reservations';
import { IReservations } from '../shared/interfaces/IReservations';
import { HttpClient } from '@angular/common/http';
import { CREATE_RESERVATIONS_URL, RESERVATIONS_URL } from '../shared/constants/urls';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  
  constructor(private http:HttpClient) { }
  
  getReservations(): Observable<Reservations[]>{
    return this.http.get<Reservations[]>(RESERVATIONS_URL);
  }

  getUserReservations(userEmail:string): Observable<Reservations[]>{
    console.log(this.http.get<Reservations[]>(RESERVATIONS_URL + userEmail));
    return this.http.get<Reservations[]>(RESERVATIONS_URL + userEmail);
  }

  createReservation(reservation: IReservations): Observable<Reservations>{
    return this.http.post<Reservations>(CREATE_RESERVATIONS_URL, reservation);
  }

}
