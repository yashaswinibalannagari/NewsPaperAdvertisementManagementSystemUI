import { Component, OnInit } from '@angular/core';
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


  constructor(private _advertisementService: AdvertisementService) { }

  ngOnInit(): void {
    this._advertisementService.getAdvertisementsByClientId()
      .subscribe((advertisement) => { this.advertisements = advertisement; console.log(advertisement) }, (errMsg) => this.errMsg = errMsg);
  }

}
