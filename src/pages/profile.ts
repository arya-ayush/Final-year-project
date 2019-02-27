import {Component} from '@angular/core';
import {LoginPage} from "./login";
import {NavController} from "ionic-angular";
import {Repository} from "../app/repository/repository";
import {ToastService} from "../app/services/toast-service";
import {OneSignal} from "@ionic-native/onesignal";
import {User} from "../app/models/user";

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
          <ion-icon item-start name = "ios-person-outline"></ion-icon>
          <h3>{{userObj.user_name}}</h3>
        </ion-item>
        <ion-item>
          <ion-icon item-start name = "ios-call-outline"></ion-icon>
          <h3>{{userObj.phone}}</h3>
        </ion-item>
        <ion-item>
          <ion-icon item-start name = "ios-mail-outline"></ion-icon>
          <h3>{{userObj.email}}</h3>
        </ion-item>
        <ion-item>
          <ion-icon item-start [name] = iconName></ion-icon>
          <h3>{{gender}}</h3>
        </ion-item>
        <ion-item>
          <ion-icon item-start name = "ios-home-outline"></ion-icon>
          <h3>Flat: {{userObj.flat_num}}</h3>
          <h3>Block: {{userObj.block}}</h3>
          <h3>Society: {{userObj.society_name}}</h3>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  styles  : [
      `

      `
  ]
})
export class ProfilePage {
  iconName: string;
  userObj: User;
  gender;

  constructor(public repository: Repository) {
    this.userObj = JSON.parse(localStorage.getItem('user'));
    if (this.userObj.gender == 'M') {
      this.iconName = 'ios-male-outline';
      this.gender   = 'Male';
    }
    else {
      this.iconName = 'ios-female-outline';
      this.gender   = 'Female';
    }
  }
}
