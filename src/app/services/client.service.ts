import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Admin } from '../shared/admin';
import { baseurl } from '../shared/baseurl';
import { Client } from '../shared/client';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }



  getClientInfo(): Observable<Client> {
    return this.http.get<Client>(baseurl + 'Client/GetClientInfo')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  updateProfile(profile: Client): Observable<Client> {

    const formData: FormData = new FormData();

    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('address', profile.address);

    formData.append('mobileNumber', profile.mobileNumber);
    formData.append('profileImageFile', profile.profileIamgeFile, profile.profileIamgeFile.name);


    console.log(formData);
    return this.http.put<Client>(baseurl + 'Client/UpdateProfile', formData).
      pipe(catchError(this.processHTTPMsgService.handleError));

  }


  createAdmin(admin: Admin): Observable<any> {
    return this.http.post<any>(baseurl + 'AdminSignUp', admin).pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
