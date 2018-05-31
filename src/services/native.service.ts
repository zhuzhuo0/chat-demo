import { Injectable } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class NativeService {

    APK_DOWNLOAD: string = 'http://192.168.0.105:5055/app-debug.apk';

    APP_DOWNLOAD: string = 'http://192.168.0.105:5055/app-debug.apk';

    constructor(
        private platform: Platform,
        private alertCtrl: AlertController,
        private transfer: FileTransfer,
        private file: File,
        private fileOpener: FileOpener,
        private inAppBrowser: InAppBrowser
    ) {
    }


    /**
     * 检查app是否需要升级
     */
    detectionUpgrade() {
        //这里连接后台获取app最新版本号,然后与当前app版本号(this.getVersionNumber())对比
        //版本号不一样就需要申请,不需要升级就return
        this.alertCtrl.create({
            title: '升级',
            subTitle: '发现新版本,是否立即升级？',
            buttons: [{ text: '取消' },
            {
                text: '确定',
                handler: () => {
                    this.downloadApp();
                }
            }
            ]
        }).present();
    }

    /**
     * 下载安装app
     */
    downloadApp() {
        if (this.isAndroid()) {
            let alert = this.alertCtrl.create({
                title: '下载进度：0%',
                enableBackdropDismiss: false,
                buttons: ['后台下载']
            });
            alert.present();

            const fileTransfer: FileTransferObject = this.transfer.create();
            const apk = this.file.externalDataDirectory + 'android.apk'; //apk保存的目录

            fileTransfer.download(this.APK_DOWNLOAD, apk).then(() => {
                this.fileOpener.open(apk, 'application/vnd.android.package-archive');
            });

            fileTransfer.onProgress((event: ProgressEvent) => {
                let num = Math.floor(event.loaded / event.total * 100);
                if (num === 100) {
                    alert.dismiss();
                } else {
                    let title = document.getElementsByClassName('alert-title')[0];
                    title && (title.innerHTML = '下载进度：' + num + '%');
                }
            });
        }
        if (this.isIos()) {
            this.openUrlByBrowser(this.APP_DOWNLOAD);
        }
    }

    /**
     * 通过浏览器打开url
     */
    openUrlByBrowser(url: string): void {
        this.inAppBrowser.create(url, '_system');
    }

    /**
     * 是否真机环境
     * @return {boolean}
     */
    isMobile(): boolean {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    }

    /**
     * 是否android真机环境
     * @return {boolean}
     */
    isAndroid(): boolean {
        return this.isMobile() && this.platform.is('android');
    }

    /**
     * 是否ios真机环境
     * @return {boolean}
     */
    isIos(): boolean {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    }
}
