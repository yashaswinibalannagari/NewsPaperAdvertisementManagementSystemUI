import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { LoginService } from '../services/login.service';
import { ForgotPassword, ForgotToken } from '../shared/forgotpassword';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgot: ForgotPassword = { email: '', securityQuestion: '' };
  errMsg: string;
  invalid: boolean;

  forgotToken: ForgotToken;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ForgotpasswordComponent>, private loginService: LoginService, private _router: Router) { }

  ngOnInit(): void {
  }



  onSubmit(): void {
    console.log('model:', this.forgot);

    this.loginService.forgotPassword(this.forgot).subscribe((data) => { this.settoken(data) }, (errMsg) => { this.errMsg = errMsg; });


  }

  settoken(data: ForgotToken) {
    this.forgotToken = data;
    console.log(this.forgotToken);
    this.dialogRef.close();
    this.dialog.open(ResetpasswordComponent, { width: '500px', height: '450px', data: { pageValue: this.forgotToken } });

  }

  seterrMsg(bool: boolean) {
    this.invalid = bool;
  }

}
