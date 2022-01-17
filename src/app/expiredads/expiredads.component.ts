import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteComponent } from '../delete/delete.component';
import { AdvertisementService } from '../services/advertisement.service';
import { Advertisement } from '../shared/advertisement';
import { baseurl } from '../shared/baseurl';

@Component({
  selector: 'app-expiredads',
  templateUrl: './expiredads.component.html',
  styleUrls: ['./expiredads.component.scss']
})
export class ExpiredadsComponent implements OnInit {
  errMsg: string;

  baseurl = baseurl;
  advertisements: Advertisement[];
  constructor(private _advertisementService: AdvertisementService, private dialog: MatDialog, private _router: Router) { }

  ngOnInit(): void {

    this._advertisementService.getExpiredAdvertisement().subscribe((advertisements) => { this.advertisements = advertisements }, (errMsg) => { this.errMsg = errMsg; });
  }


  openDeleteForm(advertisementId: any) {
    this.dialog.open(DeleteComponent, { width: '500px', height: '200px', data: { pageValue: advertisementId } });
  }

}
