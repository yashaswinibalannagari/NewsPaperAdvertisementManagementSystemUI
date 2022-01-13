import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private _loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // req.headers.append();
    // if (req.url == 'http://localhost:5000/Login' || req.url == 'http://localhost:5000/SignUp') {
    //   return next.handle(req);
    // }

    let modifiedRequest = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + this._loginService.getToken())
    })
    return next.handle(modifiedRequest);
  }
}

