import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Advertisement } from '../shared/advertisement';
import { baseurl } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }



  getAdvertisements(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(baseurl + 'advertisements')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getAdvertisementsByClientId(): Observable<number[] | any> {
    return this.http.get<Advertisement>(baseurl + 'Client/GetAdvertisementsByClientId')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  postAdvertisement(advertisement: Advertisement): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post(baseurl + 'Client/AddAdvertisement', advertisement, httpOptions)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  getExpiredAdvertisement(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(baseurl + 'expiredadvertisement')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  updateAdvertisementStatus(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.put(baseurl + 'UpdateAdvertisementStatus/' + id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  deleteAdvertisement(id: string) {
    return this.http.delete(baseurl + 'advertisements/' + id)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }
}
