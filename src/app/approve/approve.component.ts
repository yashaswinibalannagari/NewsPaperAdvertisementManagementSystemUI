import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdvertisementService } from '../services/advertisement.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})


export class ApproveComponent implements OnInit {



  fromPage: string;
  fromDialog: string;
  errMsg: string;

  constructor(private advertisementService: AdvertisementService, private diaglogRef: MatDialogRef<ApproveComponent>, private _router: Router, public _loginService: LoginService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.fromPage = data.pageValue;
  }

  ngOnInit(): void {
  }


  ApproveAd() {
    this.advertisementService.updateAdvertisementStatus(this.fromPage).subscribe(() => { }, (errMsg) => { this.errMsg = errMsg; });
    this.diaglogRef.close();
    this.reloadComponent();
    console.log('succesfully approved');

  }


  // deleteAdByAdmin() {
  //   this.advertisementService.deleteAdvertisementByAdmin(this.fromPage).subscribe(() => { }, (errMsg) => { this.errMsg = errMsg });
  //   this.diaglogRef.close();
  //   this.reloadComponent();
  //   console.log('successfully deleted');
  // }

  reloadComponent() {
    let currentUrl = this._router.url;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate([currentUrl]);
  }
}
