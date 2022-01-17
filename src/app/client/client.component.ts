import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SUBSCRIBERS } from '../shared/subscribers';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }


  subscribers = SUBSCRIBERS;

  postNewAd() {
    this._router.navigate(['/newadd']);
  }

}
