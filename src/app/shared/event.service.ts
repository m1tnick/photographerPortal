import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  uri = 'http://localhost:3005/event';

  constructor(private http: HttpClient) { }

  create(name, date, type) {
    const obj = {
      name: name,
      date: date,
      type: type
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
}
