import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteComponent } from '../delete/delete.component';
import { AdvertisementService } from '../services/advertisement.service';
import { Advertisement } from '../shared/advertisement';
import { baseurl } from '../shared/baseurl';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.scss']
})
export class MyadsComponent implements OnInit {

  advertisements: Advertisement[];
  errMsg: string;
  baseurl: string = baseurl;


  constructor(private _advertisementService: AdvertisementService, private dialog: MatDialog, private _router: Router) {

  }

  ngOnInit(): void {
    this._advertisementService.getAdvertisementsByClientId()
      .subscribe((advertisement) => { this.advertisements = advertisement; console.log(advertisement) }, (errMsg) => this.errMsg = errMsg);

  }




  openDeleteForm(advertisementId: any) {
    this.dialog.open(DeleteComponent, { width: '500px', height: '200px', data: { pageValue: advertisementId } });
  }

}
