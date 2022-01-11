import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { LoginService } from '../services/login.service';
import { Token } from '../shared/token';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, public _loginService: LoginService) { }

  ngOnInit(): void {
    // this.isLoggedIn = this.loginService.loggedIn();

  }
  openLoginForm() {
    this.dialog.open(LoginComponent, { width: '500px', height: '450px' });
  }


  openSignupForm() {
    this.dialog.open(RegisterComponent, { width: '500px', height: '570px' });
  }
  // Logout() {
  //   this.loginService.logout();
  // }

}
