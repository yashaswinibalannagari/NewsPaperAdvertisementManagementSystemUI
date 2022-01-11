import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { Token } from '../shared/token';
import { User } from '../shared/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = { email: '', password: '' };
  token: Token;
  errMsg: string;
  constructor(public dialogRef: MatDialogRef<LoginComponent>, private loginService: LoginService, private _router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log('User:', this.user);
    this.loginService.submitLogin(this.user).subscribe(token => {
      if (token.role == 'Admin') {
        this._router.navigate(['/admin'])
      }
      else if (token.role == 'User') {
        this._router.navigate(['/client'])
      }
      this.setToken(token);
    }, errMsg => this.errMsg = errMsg);
    this.dialogRef.close();
  }

  setToken(token: Token) {
    this.token = token;
    console.log(token);
  }



}