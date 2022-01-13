import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { baseurl } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }

  postPayment(id: string) {
    return this.http.post(baseurl + 'payment/' + id, {})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPaymentByAdvertisementId(): Observable<number[] | any> {
    return this.getPaymentByAdvertisementsId().pipe(map(payments => payments.map(payment => payment._id)))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
