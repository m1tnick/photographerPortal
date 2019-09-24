import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export enum FileQueueStatus {
    Pending,
    Success,
    Error,
    Progress
}
export class FileQueueObject {
    public file: any;
    public status: FileQueueStatus = FileQueueStatus.Pending;
    public progress = 0;
    public request: Subscription = null;
    public response: HttpResponse<any> | HttpErrorResponse = null;

    constructor(file: any) {
        this.file = file;
    }

    // actions
    public upload = () => {
        /* set in service */
    }
    public cancel = () => {
        /* set in service */
    }
    public remove = () => {
        /* set in service */
    }

    // statuses
    public isPending = () => this.status === FileQueueStatus.Pending;
    public isSuccess = () => this.status === FileQueueStatus.Success;
    public isError = () => this.status === FileQueueStatus.Error;
    public inProgress = () => this.status === FileQueueStatus.Progress;
    public isUploadable = () =>
        this.status === FileQueueStatus.Pending ||
        this.status === FileQueueStatus.Error
}
@Injectable({
    providedIn: 'root'
})
export class UploadService {
    baseURL = 'http://localhost:3005';
    imagesURL = this.baseURL + '/images';

    eventId: string;

    private _queue: BehaviorSubject<FileQueueObject[]>;
    private _files: FileQueueObject[] = [];

    constructor(private http: HttpClient) {
        this._queue = <BehaviorSubject<FileQueueObject[]>>(
            new BehaviorSubject(this._files)
        );
    }

    public get queue() {
        return this._queue.asObservable();
    }

    public onCompleteItem(queueObj: FileQueueObject, response: any): any {
        return { queueObj, response };
    }

    public addToQueue(data: any) {
        // add file to the queue
        _.each(data, (file: any) => this._addToQueue(file));
    }

    public clearQueue() {
        // clear the queue
        this._files = [];
        this._queue.next(this._files);
    }

    public uploadAll(eventId) {
        this.eventId = eventId;
        // upload all except already successfull or in progress
        _.each(this._files, (queueObj: FileQueueObject) => {
            if (queueObj.isUploadable()) {
                this._upload(queueObj);
            }
        });
    }

    private _removeFromQueue(queueObj: FileQueueObject) {
        _.remove(this._files, queueObj);
    }

    private _addToQueue(file: any) {
        const queueObj = new FileQueueObject(file);

        // set the individual object events
        queueObj.upload = () => this._upload(queueObj);
        queueObj.remove = () => this._removeFromQueue(queueObj);
        queueObj.cancel = () => this._cancel(queueObj);

        // push to the queue
        this._files.push(queueObj);
        this._queue.next(this._files);
    }

    private _upload(queueObj: FileQueueObject) {
        // create form data for file
        const form = new FormData();
        form.append('file', queueObj.file, queueObj.file.name);

        // upload file and report progress
        const req = new HttpRequest('POST', `${this.imagesURL}/${this.eventId}`, form, {
            reportProgress: true
        });

        // upload file and report progress
        queueObj.request = this.http.request(req).subscribe(
            (event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this._uploadProgress(queueObj, event);
                } else if (event instanceof HttpResponse) {
                    this._uploadComplete(queueObj, event);
                }
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    this._uploadFailed(queueObj, err);
                } else {
                    // The backend returned an unsuccessful response code.
                    this._uploadFailed(queueObj, err);
                }
            }
        );

        return queueObj;
    }

    private _cancel(queueObj: FileQueueObject) {
        // update the FileQueueObject as cancelled
        queueObj.request.unsubscribe();
        queueObj.progress = 0;
        queueObj.status = FileQueueStatus.Pending;
        this._queue.next(this._files);
    }

    private _uploadProgress(queueObj: FileQueueObject, event: any) {
        // update the FileQueueObject with the current progress
        const progress = Math.round((100 * event.loaded) / event.total);
        queueObj.progress = progress;
        queueObj.status = FileQueueStatus.Progress;
        this._queue.next(this._files);
    }

    private _uploadComplete(
        queueObj: FileQueueObject,
        response: HttpResponse<any>
    ) {
        // update the FileQueueObject as completed
        queueObj.progress = 100;
        queueObj.status = FileQueueStatus.Success;
        queueObj.response = response;
        this._queue.next(this._files);
        this.onCompleteItem(queueObj, response.body);
    }

    private _uploadFailed(
        queueObj: FileQueueObject,
        response: HttpErrorResponse
    ) {
        // update the FileQueueObject as errored
        queueObj.progress = 0;
        queueObj.status = FileQueueStatus.Error;
        queueObj.response = response;
        this._queue.next(this._files);
    }
    // upload(eventId: string, formData) {
    //     const apiUrl = `${this.imagesURL}/${eventId}`;
    //     return this.http
    //         .post<any>(`${apiUrl}`, formData, {
    //             reportProgress: true,
    //             observe: 'events'
    //         })
    //         .pipe(
    //             map(event => this.getEventMessage(event, formData)),
    //             catchError(this.handleError)
    //         );
    // }

    // private getEventMessage(event: HttpEvent<any>, formData) {
    //     switch (event.type) {
    //         case HttpEventType.UploadProgress:
    //             return this.fileUploadProgress(event);

    //         case HttpEventType.Response:
    //             return this.apiResponse(event);

    //         default:
    //             return `File "${
    //                 formData.get('profile').name
    //             }" surprising upload event: ${event.type}.`;
    //     }
    // }

    // private fileUploadProgress(event) {
    //     const percentDone = Math.round((100 * event.loaded) / event.total);
    //     return { status: 'progress', message: percentDone };
    // }

    // private apiResponse(event) {
    //     return event.body;
    // }

    // private handleError(error: HttpErrorResponse) {
    //     if (error.error instanceof ErrorEvent) {
    //         // A client-side or network error occurred. Handle it accordingly.
    //         console.error('An error occurred:', error.error.message);
    //     } else {
    //         // The backend returned an unsuccessful response code.
    //         // The response body may contain clues as to what went wrong,
    //         console.error(
    //             `Backend returned code ${error.status}, ` +
    //                 `body was: ${error.error}`
    //         );
    //     }
    //     // return an observable with a user-facing error message
    //     return throwError('Something bad happened. Please try again later.');
    // }
}
