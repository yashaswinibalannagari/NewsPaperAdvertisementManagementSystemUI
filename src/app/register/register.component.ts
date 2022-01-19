import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Register } from '../shared/register';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: Register = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    securityQuestion: ''
  };
  successRegistration: boolean;

  errMsg: string;
  constructor(public dialog: MatDialogRef<RegisterComponent>, private _router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }


  onSubmit(): void {

    console.log(this.register);
    this.loginService.signUp(this.register).subscribe(bool => {
      if (bool) {
        this.setSuccess(bool);
        this.dialog.updateSize("400px", "200px");
      }
      else {

      }
    }, errMsg => { this.errMsg = errMsg; })
  }

  setSuccess(bool: boolean) {
    this.successRegistration = bool;
  }


}
