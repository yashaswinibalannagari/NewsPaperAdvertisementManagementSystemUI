import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdvertisementService } from '../services/advertisement.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  fromPage: string;
  fromDialog: string;
  errMsg: string;

  constructor(private _router: Router, private advertisementService: AdvertisementService, private diaglogRef: MatDialogRef<DeleteComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fromPage = data.pageValue;
  }

  ngOnInit(): void {
  }


  deleteAd() {
    this.advertisementService.deleteAdvertisementByClient(this.fromPage).subscribe(() => { }, (errMsg) => { this.errMsg = errMsg });
    this.diaglogRef.close();
    this.reloadComponent();
    console.log('successfully deleted');
  }

  reloadComponent() {
    let currentUrl = this._router.url;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate([currentUrl]);
  }

}
