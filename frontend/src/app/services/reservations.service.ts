import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Reservations } from '../shared/models/Reservations';
import { IReservations } from '../shared/interfaces/IReservations';
import { HttpClient } from '@angular/common/http';
import { CREATE_RESERVATIONS_URL, RESERVATIONS_DELETE_URL, RESERVATIONS_APPROVED_URL , RESERVATIONS_URL, RESERVATIONS_REJECT_URL, UPLOAD_RESERVATIONS_URL } from '../shared/constants/urls';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  
  constructor(private http:HttpClient) { }

  upload(file: any){
    return this.http.post( UPLOAD_RESERVATIONS_URL, file);
  }
  
  getReservations(): Observable<Reservations[]>{
    return this.http.get<Reservations[]>(RESERVATIONS_URL);
  }

  getUserReservations(userEmail:string): Observable<Reservations[]>{
    return this.http.get<Reservations[]>(RESERVATIONS_URL + userEmail);
  }

  adminApproveReservations(reservation: IReservations): Observable<Reservations>{
    return this.http.patch<Reservations>(RESERVATIONS_APPROVED_URL, reservation);
  }

  adminRejectReservations(reservation: IReservations): Observable<Reservations>{
    return this.http.patch<Reservations>(RESERVATIONS_REJECT_URL, reservation);
  }

  adminDeleteReservations(reservation: IReservations){
    return this.http.delete(RESERVATIONS_DELETE_URL + reservation.userEmail +'/'+ reservation.eventName +'/'+ reservation.seatNo);
  }

  createReservation(reservation: IReservations): Observable<Reservations>{
    return this.http.post<Reservations>(CREATE_RESERVATIONS_URL, reservation);
  }



}
