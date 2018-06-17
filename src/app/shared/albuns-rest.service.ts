import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';

const httpImageUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'image'
    })
  };

const url = 'https://m1tnick-m1tnick.c9users.io/albuns'; 

@Injectable()
export class AlbunsRestService {
  constructor(private httpClient: HttpClient) {}

  public getAlbumImage() {
    return this.httpClient.get(url);
  }

  getImage(imageUrl: string): Observable<File> {
    return this.httpClient
        .get(url, { responseType: ResponseContentType.Blob })
        .map((res: Response) => res.blob());
} 

  public upload(files: Set<File>): {[key:string]:Observable<number>} {
    // this will be the our resulting map
    const status = {};

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
      this.httpClient.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

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

 public postFile(formData: FormData): Observable<any> {
    const endpoint = 'https://m1tnick-m1tnick.c9users.io/albuns';
    //const formData: FormData = new FormData();
    //formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient.post(endpoint, formData, httpImageUploadOptions)
    .pipe(
        tap( // Log the result or error
          catchError(this.handleError)
          //  data => console.log(data),
           // error => console.log(error)
          )
      );
  }   

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}