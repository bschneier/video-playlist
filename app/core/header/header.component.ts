import { Component, OnInit } from '@angular/core';
import './header.component.scss';

@Component({
  selector: 'video-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public isIphoneStandalone = false;

  constructor() { }

  ngOnInit() {
    if ((navigator as any).standalone) {
      this.isIphoneStandalone = true;
    }
  }
}
