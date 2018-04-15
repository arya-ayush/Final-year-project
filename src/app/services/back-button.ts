import {BackgroundMode} from "@ionic-native/background-mode";
import {AlertController, App, Platform} from "ionic-angular";
import {Injectable} from "@angular/core";
import {ToastService} from "./toast-service";
import {LoginPage} from "../../pages/login";

@Injectable()
export class BackButtonService {
  constructor(private background: BackgroundMode,
              private alertCtrl: AlertController,
              private app: App,
              private platform: Platform,
              private toast: ToastService,) {
  }
  public counter = 0;

  handleBackButton() {
    this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNavs()[0];
      let active = nav.getActive();
      const overlayView = this.app._appRoot._overlayPortal._views[0];
      if (overlayView && overlayView.dismiss) {
        overlayView.dismiss();
      }
      else {
        if (nav.canGoBack()) {
          nav.pop();
        }
        else {
          if (active.instance instanceof LoginPage) {
            const alert = this.alertCtrl.create({
              title: 'Close App',
              message: 'Do you want to close the app?',
              buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Donot Exit');
                }
              }, {
                text: 'Close App',
                handler: () => {
                  this.platform.exitApp();
                }
              }]
            });
            alert.present();
          }
          else {
            if (this.counter == 0) {
              this.counter++;
              this.toast.generalToast("Press back again to exit");
              setTimeout(() => {
                this.counter = 0
              }, 3000)
            } else {
              this.background.moveToBackground();
            }
          }
        }
      }
    }, 2)
  }

}
