import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEvent } from '@/models/event.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    baseURL = 'http://localhost:3005';
    eventsURL = this.baseURL + '/events';
    imagesURL = this.baseURL + '/images';

    constructor(private http: HttpClient) {}

    create(name, date, type) {
        const obj = {
            name: name,
            date: date,
            type: type
        };
        console.log(obj);
        this.http
            .post(`${this.eventsURL}`, obj)
            .subscribe(res => console.log('Done'));
    }

    getEvents() {
        return this.http.get(`${this.eventsURL}`);
    }

    editEvent(id): Observable<IEvent> {
        return this.http.get<IEvent>(`${this.eventsURL}/${id}`);
    }

    updateEvent(name, date, type, id) {
        const obj = {
            name: name,
            date: date,
            type: type
        };

        this.http
            .patch(`${this.eventsURL}/${id}`, obj)
            .subscribe(res => console.log('Done'));
    }

    deleteEvent(id) {
        return this.http.delete(`${this.eventsURL}/${id}`);
    }


    upload(eventId: string, formData): Observable<any> {
        return this.http.post(`${this.imagesURL}/${eventId}`, formData);
    }

    deleteImage(eventId: string, imageId: string) {
        return this.http.delete(`${this.imagesURL}/${eventId}/${imageId}`);
    }

}
