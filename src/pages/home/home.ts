import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { AppAvailability } from '@ionic-native/app-availability';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public appAvailability: AppAvailability
  ) {

  }

  enterDetail() {
    this.navCtrl.push(ChatPage);
  }

  openQQ() {
    let app;
    if (this.platform.is('ios')) {
      app = 'qq://';
    } else if (this.platform.is('android')) {
      app = 'com.tencent.mobileqq';
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          var sApp = (window as any).startApp.set({
            "package": app
          });
          sApp.start();
        },
        (no: boolean) => alert(app + ' is NOT available')
      );
  }

}
