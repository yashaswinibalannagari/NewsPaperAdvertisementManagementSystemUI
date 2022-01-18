import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertisementService } from '../services/advertisement.service';
import { Advertisement } from '../shared/advertisement';
import { baseurl } from '../shared/baseurl';

@Component({
  selector: 'app-viewad',
  templateUrl: './viewad.component.html',
  styleUrls: ['./viewad.component.scss']
})
export class ViewadComponent implements OnInit {

  id: any;
  advertisements: Advertisement[];
  advertisement: any;
  imgUrl: any;
  errMsg: any;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private advertisementService: AdvertisementService) {


  }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
      this.advertisementService.getAdvertisements().subscribe((advertisements) => { this.setAdvertisements(advertisements) }, errMsg => { this.errMsg = errMsg });

    });
  }


  setAdvertisements(advertisements: any): void {
    this.advertisements = advertisements;
    this.advertisement = this.advertisements.find(a => a.advertisementId == this.id);
    console.log(this.advertisement);
    this.imgUrl = baseurl + 'Images/Advertisements/' + this.advertisement.advertisementImageName;
    console.log(this.imgUrl);

  }



}
