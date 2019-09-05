import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    baseURL = 'http://localhost:3005';
    imagesURL = this.baseURL + '/images';

    constructor(private http: HttpClient) {}

    public upload(
        eventId: string,
        files: Set<File>
    ): { [key: string]: { progress: Observable<number> } } {
        const url = `${this.imagesURL}/${eventId}`;
        // this will be the our resulting map
        const status: { [key: string]: { progress: Observable<number> } } = {};

        files.forEach(file => {
            // create a new multipart-form for every file
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);

            // create a http-post request and pass the form
            // tell it to report the upload progress
            const req = new HttpRequest('POST', url, formData, {
                reportProgress: true
            });

            // create a new progress-subject for every file
            const progress = new Subject<number>();

            // send the http-request and subscribe for progress-updates
            this.http.request(req).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // calculate the progress percentage
                    const percentDone = Math.round(
                        (100 * event.loaded) / event.total
                    );

                    // pass the percentage into the progress-stream
                    progress.next(percentDone);
                } else if (event instanceof HttpResponse) {
                    // Close the progress-stream if we get an answer form the API
                    // The upload is complete
                    progress.complete();
                }
            });

            // Save every progress-observable in a map of all observables
            status[file.name] = {
                progress: progress.asObservable()
            };
        });

        // return the map of progress.observables
        return status;
    }
}
