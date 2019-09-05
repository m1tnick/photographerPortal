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
        return this.http.post(this.imagesURL + eventId, formData);
    }

    // public upload2(
    //     eventId: string,
    //     files: Set<File>
    // ): { [key: string]: { progress: Observable<number> } } {
        // this will be the our resulting map
        // const status: { [key: string]: { progress: Observable<number> } } = {};
        // const uploadURL = `${this.imagesURL}/${eventId}`;

        // files.forEach(file => {
        //     // create a new multipart-form for every file
        //     const formData: FormData = new FormData();
        //     formData.append('file', file, file.name);

        //     // create a http-post request and pass the form
        //     // tell it to report the upload progress
        //     const req = new HttpRequest('POST', uploadURL, formData, {
        //         reportProgress: true
        //     });

        //     // create a new progress-subject for every file
        //     const progress = new Subject<number>();

        //     // send the http-request and subscribe for progress-updates
        //     this.http.request(req).subscribe(event => {
        //         if (event.type === HttpEventType.UploadProgress) {
        //             // calculate the progress percentage
        //             const percentDone = Math.round(
        //                 (100 * event.loaded) / event.total
        //             );

        //             // pass the percentage into the progress-stream
        //             progress.next(percentDone);
        //         } else if (event instanceof HttpResponse) {
        //             // Close the progress-stream if we get an answer form the API
        //             // The upload is complete
        //             progress.complete();
        //         }
        //     });

        //     // Save every progress-observable in a map of all observables
        //     status[file.name] = {
        //         progress: progress.asObservable()
        //     };
        // });

        // // return the map of progress.observables
        // return status;
    // }
}
