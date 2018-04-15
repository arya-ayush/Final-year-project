import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastService {
  constructor(private toastctrl: ToastController) {

  }

  success(message: string, duration: number = 2000, showclosebutton?: boolean, closeButtonText?: string, action?: any) {
    let successtoast = this.toastctrl.create({
      message: message,
      duration: duration,
      cssClass: 'success-alert',
      showCloseButton: showclosebutton,
      closeButtonText: closeButtonText,
    })
    successtoast.present();
  }

  error(message: string, duration: number = 3000) {
    let errortoast = this.toastctrl.create({
      message: message,
      duration: duration,
      cssClass: 'error-alert',
    })
    errortoast.present();
  }

  generalToast(message: string, duration: number = 3000) {
    this.toastctrl.create({
      message: message,
      duration: duration,
    }).present();
  }

}
