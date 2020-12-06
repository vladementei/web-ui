import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RestService {

  private recognitionServerUrl: string = 'http://63fb964aa9ff.ngrok.io/';

  constructor(private http: HttpClient) {
  }

  sendImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.recognitionServerUrl, formData, {responseType: 'arraybuffer'});
  }
}
