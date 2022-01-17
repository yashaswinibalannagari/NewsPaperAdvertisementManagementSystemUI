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
    return this.http.get<Advertisement[]>(baseurl + 'Admin/GetAdvertisements')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getUnApprovedAds(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(baseurl + 'Admin/GetUnApprovedAds')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getAdvertisementsByClientId(): Observable<number[] | any> {
    return this.http.get<Advertisement[]>(baseurl + 'Client/GetAdvertisementsByClientId')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  // getAdvertisementsById(): Observable<number[] | any> {
  //   return this.http.get<Advertisement>(baseurl + 'Client/GetAdvertisementsByClientId')
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }


  postAdvertisement(advertisement: Advertisement): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('advertisementTitle', advertisement.advertisementTitle);
    formData.append('advertisementType', advertisement.advertisementType);
    formData.append('advertisementDesc', advertisement.advertisementDesc);
    formData.append('advertisementImageFile', advertisement.advertisementImageFile, advertisement.advertisementImageFile.name);
    formData.append('subscriptionPlan', advertisement.subscriptionPlan);
    formData.append('subscriber', advertisement.subscriber);
    formData.append('advertisementSize', advertisement.advertisementSize);
    formData.append('advRegisteredDate', advertisement.advRegistrationDate);
    formData.append('agree', advertisement.agree.toString());
    formData.append('subscriptionDays', advertisement.subscriptionDays.toString());

    console.log(formData);

    return this.http.post<any>(baseurl + 'Client/AddAdvertisement', formData)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  UpdateAdvertisement(advertisement: Advertisement): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('advertisementTitle', advertisement.advertisementTitle);
    formData.append('advertisementType', advertisement.advertisementType);
    formData.append('advertisementDesc', advertisement.advertisementDesc);
    formData.append('advertisementImageFile', advertisement.advertisementImageFile, advertisement.advertisementImageFile.name);
    formData.append('advertisementId', advertisement.advertisementId.toString());

    return this.http.put<any>(baseurl + 'Client/UpdateAdvertisement', formData)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }


  getExpiredAdvertisement(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(baseurl + 'Admin/GetExpiredAdvertisements')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  updateAdvertisementStatus(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.put<any>(baseurl + 'Admin/UpdateAdvertisementStatus/' + id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  deleteAdvertisementByClient(id: string): Observable<any> {
    return this.http.delete<any>(baseurl + 'Client/DeleteAdvertisementByClient/' + id)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }


  deleteAdvertisementByAdmin(id: string): Observable<any> {
    return this.http.delete<any>(baseurl + 'Admin/DeleteAdvertisement/' + id)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }



}
