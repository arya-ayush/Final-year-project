import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfilePage} from "../profile";
import {AddMemberPage} from "../add-member";
import {DatePicker} from "@ionic-native/date-picker";
import {ToastService} from "../../app/services/toast-service";
import {VisitorLogPage} from "../visitor-log";
import {NotificationMemberPage} from "../notification-member";
import {Repository} from "../../app/repository/repository";
import {OneSignal} from "@ionic-native/onesignal";
import { LoginPage } from "../login";
import { window } from "rxjs/operators";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userId : string;
  constructor(public navCtrl: NavController,private datePicker: DatePicker ,
              private toast:ToastService , public repository:Repository , private oneSignal:OneSignal) {
    this.initialiseOneSignal();
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

  initialiseOneSignal(){
    if((<any>window).cordova){

      this.oneSignal.startInit('a0944a39-671f-4402-9737-7621eae222b0', '1095666574421');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
      this.oneSignal.endInit();
      this.oneSignal.getIds().then( id => {
        this.userId = id.userId;
        this.repository.addOneSignalId(this.userId).subscribe(res => {
          this.toast.success("Push Notification Subscribed");
        }, error => {
          this.toast.error("Push Notification cannot be subscribed");
        })
      })
    }
  }

  logout() {
    this.repository.adminLogout();
    this.navCtrl.setRoot(LoginPage)
  }

}
