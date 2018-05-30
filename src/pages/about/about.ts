import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WsService } from '../../services/ws.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [WsService]
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    private ws: WsService
  ) {
    this.ws.createWsServe('ws://localhost:8085').subscribe(
      data => {
        console.log((JSON.parse(data)));
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('end');
      }
    )
  }

  messageSend() {
    this.ws.sendMessage('i am client');
  }

}
