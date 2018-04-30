import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfilePage} from "../profile";
import {AddMemberPage} from "../add-member";
import {DatePicker} from "@ionic-native/date-picker";
import {ToastService} from "../../app/services/toast-service";
import {VisitorLogPage} from "../visitor-log";
import {NotificationMemberPage} from "../notification-member";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private datePicker: DatePicker , private toast:ToastService) {

  }

  showProfile() {
    this.navCtrl.push(ProfilePage);
  }

  add() {
    this.navCtrl.push(AddMemberPage);
  }

  notification(){
    this.navCtrl.push(NotificationMemberPage);
  }

  visitorLog(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      (date) => {
        this.navCtrl.push(VisitorLogPage,{'date':date , 'user': 'user'});
      },
      (err) => {
        this.toast.error('Error occurred while getting date');
      }
    );
  }
}
