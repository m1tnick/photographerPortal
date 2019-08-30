import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    uri = 'http://localhost:3005/events';

    constructor(private http: HttpClient) { }

    create(name, date, type) {
        const obj = {
            name: name,
            date: date,
            type: type
        };
        console.log(obj);
        this.http.post(`${this.uri}`, obj)
            .subscribe(res => console.log('Done'));
    }

    getEvents() {
        return this
            .http
            .get(`${this.uri}`);
    }

    editEvent(id) {
        return this
            .http
            .get(`${this.uri}/${id}`);
    }

    updateEvent(name, date, type, id) {
        const obj = {
            name: name,
            date: date,
            type: type
        };

        this.http
            .patch(`${this.uri}/${id}`, obj)
            .subscribe(res => console.log('Done'));
    }

    deleteEvent(id) {
        return this.http.delete(`${this.uri}/${id}`);
    }
}







