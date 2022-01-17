import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApproveComponent } from '../approve/approve.component';
import { DeleteComponent } from '../delete/delete.component';
import { AdvertisementService } from '../services/advertisement.service';
import { Advertisement } from '../shared/advertisement';
import { baseurl } from '../shared/baseurl';

@Component({
  selector: 'app-approveads',
  templateUrl: './approveads.component.html',
  styleUrls: ['./approveads.component.scss']
})
export class ApproveadsComponent implements OnInit {
  errMsg: string;

  baseurl = baseurl;
  advertisements: Advertisement[];
  constructor(private _advertisementService: AdvertisementService, private dialog: MatDialog, private _router: Router) { }

  ngOnInit(): void {

    this._advertisementService.getUnApprovedAds().subscribe((advertisement) => { this.advertisements = advertisement; console.log(advertisement) }, (errMsg) => { this.errMsg = errMsg });

  }


  openDeleteForm(advertisementId: any) {
    this.dialog.open(DeleteComponent, { width: '500px', height: '200px', data: { pageValue: advertisementId } });
  }

  ApproveAd(advertisementId: any) {
    this.dialog.open(ApproveComponent, { width: '500px', height: '200px', data: { pageValue: advertisementId } });
  }


}
