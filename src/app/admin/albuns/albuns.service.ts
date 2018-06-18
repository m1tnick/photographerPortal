import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Album } from '../../models/album';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AlbunsService {
    private albumUrl = 'https://m1tnick-m1tnick.c9users.io/albuns/';

    constructor(private http: HttpClient) {}

    public createAlbum(album: Album) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          }; 
        
        return this.http.post<Album>(this.albumUrl, album, httpOptions);  
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