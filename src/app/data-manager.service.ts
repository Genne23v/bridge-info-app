import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BridgeId, Bridge } from './bridge';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log(
        '[DataManagerService] client-side error',
        error.error.message
      );
    } else {
      console.log(
        `[DataManagerService] server-side error: status=${error.status}`,
        error.error
      );
    }

    return throwError('Error communicating with API server');
  }

  getBridges(): Observable<BridgeId[]> {
    const url = `${this.apiUrl}/bridges`;
    return this.http
      .get<BridgeId[]>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getBridge(id: string): Observable<Bridge> {
    const url = `${this.apiUrl}/bridges/${id}`;
    return this.http.get<Bridge>(url).pipe(retry(2), catchError(this.handleError))
  }
}
