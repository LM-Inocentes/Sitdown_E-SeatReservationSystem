import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EventsInfo } from '../shared/models/EventsInfo';
import { IEvent } from '../shared/interfaces/IEvent';
import { EVENTS_URL, CREATE_EVENTS_URL, EVENTS_BY_SEARCH_URL, EVENTS_ID_URL, EVENTS_IMG_URL } from '../shared/constants/urls'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient, private toastrService: ToastrService) { }

  getEvents(): Observable<EventsInfo[]>{
    return this.http.get<EventsInfo[]>(EVENTS_URL);
  }

  getEventsBySearchTerm(searchTerm: string) {
    return this.http.get<EventsInfo[]>(EVENTS_BY_SEARCH_URL + searchTerm);
  }

  getEventsID(eventID:string):Observable<EventsInfo>{
    return this.http.get<EventsInfo>(EVENTS_ID_URL + eventID);
  }

  createEvent(eventCreate :IEvent): Observable<EventsInfo>{
    
    return this.http.post<EventsInfo>(CREATE_EVENTS_URL, eventCreate);
  }

  upload(file:any):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(EVENTS_IMG_URL, formData)
}

}