import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdvertisementService } from '../services/advertisement.service';
import { Advertisement } from '../shared/advertisement';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  advertisements: Advertisement[];
  errMsg: string;

  constructor(private _advertisementService: AdvertisementService, private _router: Router) {

  }

  ngOnInit(): void {
    this._advertisementService.getAdvertisementsByClientId()
      .subscribe((advertisement) => { this.advertisements = advertisement; console.log(advertisement) }, (errMsg) => this.errMsg = errMsg);
  }


  deleteNotification(id: any) {
    this._advertisementService.deleteNotification(id).subscribe(() => { }, (errMsg) => { this.errMsg = errMsg });
    this.reloadComponent();

  }


  reloadComponent() {
    let currentUrl = this._router.url;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate([currentUrl]);
  }


}
