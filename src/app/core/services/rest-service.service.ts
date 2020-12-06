import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RestService {

  constructor(private http: HttpClient) {
  }

  sendImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    //return this.http.post<any>('', formData, {});
    return of(null);
  }
}
