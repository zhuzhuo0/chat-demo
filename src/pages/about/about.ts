import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WsService } from '../../services/ws.service';
import { NativeService } from '../../services/native.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    private ws: WsService,
    private nativeService: NativeService
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

  // 更新应用
  updateApp() {
    this.nativeService.detectionUpgrade();
  }

}
