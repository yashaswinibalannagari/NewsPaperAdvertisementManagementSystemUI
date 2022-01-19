import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { ForgotToken } from '../shared/forgotpassword';
import { ResetPassword } from '../shared/resetpassword';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  reset: ResetPassword = { token: '', email: '', password: '', confirmPassword: '' };
  forgotdata: ForgotToken
  invalid: any;
  errMsg: string;
  successReset: boolean;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ResetpasswordComponent>, private loginService: LoginService) {
    this.forgotdata = data.pageValue;
    this.reset.token = this.forgotdata.token;
    this.reset.email = this.forgotdata.email;
  }

  ngOnInit(): void {


  }

  onSubmit() {

    console.log(this.reset);

    this.loginService.resetPassword(this.reset).subscribe((bool) => {
      console.log(bool);
      if (bool) {
        this.setSuccess(bool);
        this.dialogRef.updateSize("400px", "200px");
      }
      else {

      }
    }, (errMsg) => { this.errMsg = errMsg; });
  }


  setSuccess(bool: boolean) {
    this.successReset = true;
  }



}
