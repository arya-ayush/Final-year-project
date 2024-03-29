import {Component} from '@angular/core';
import {LoginPage} from "./login";
import {NavController} from "ionic-angular";
import {Repository} from "../app/repository/repository";
import {ToastService} from "../app/services/toast-service";
import {OneSignal} from "@ionic-native/onesignal";

@Component({
  selector: 'page-profile',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Profile</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-icon item-start name="ios-person-outline"></ion-icon>
          <h3>{{userObj.username}}</h3>
        </ion-item>
        <ion-item>
          <ion-icon item-start name="ios-call-outline"></ion-icon>
          <h3>{{userObj.phone}}</h3>
        </ion-item>
        <ion-item>
          <ion-icon item-start name="ios-mail-outline"></ion-icon>
          <h3>{{userObj.email}}</h3>
        </ion-item>
        <ion-item>
          <ion-icon item-start [name]=iconName></ion-icon>
          <h3>{{gender}}</h3>
        </ion-item>
        <ion-item>
          <ion-icon item-start name="ios-home-outline"></ion-icon>
          <h3>Flat: {{userObj.flat_num}}</h3>
          <h3>Block: {{userObj.block}}</h3>
          <h3>Society: {{userObj.society_name}}</h3>
        </ion-item>
      </ion-list>
      <ion-row>
        <ion-col col-sm-4 col-md-5></ion-col>
        <ion-col col-sm-4 col-md-2>
          <button outline ion-button (click)="logout()">
            <ion-icon name="ios-power"></ion-icon>
            <span padding-left>Logout</span>
          </button>
        </ion-col>
        <ion-col col-sm-4 col-md-5></ion-col>
      </ion-row>
    </ion-content>
  `,
  styles: [`

  `]
})
export class ProfilePage {
  iconName: string;
  userObj;
  gender;
  userId : string;
  constructor(public repository: Repository,
              public navCtrl: NavController,
              private toast: ToastService ,
              private oneSignal: OneSignal) {
    this.userObj = JSON.parse(localStorage.getItem('user'));
    if (this.userObj.gender == 'M') {
      this.iconName = 'ios-male-outline';
      this.gender = 'Male';
    }
    else {
      this.iconName = 'ios-female-outline';
      this.gender = 'Female';
    }
  }

  logout() {
    this.oneSignal.getIds().then( id => {
      this.userId = id.userId;
      this.repository.logout(this.userId).subscribe(res => {
        this.navCtrl.setRoot(LoginPage)
        this.toast.success("Successfully Logged Out");
      }, error => {
        this.toast.error("Some Error Occured");
      })
    })
  }
}
