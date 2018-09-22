import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from "../../app/services/service";
import { VisitorLogPage } from "../visitor-log";
import { DatePicker } from "@ionic-native/date-picker";
import { ToastService } from "../../app/services/toast-service";
import { AddFlatOwnerPage } from "./add-flat-owner";
import { AddVisitorPage } from "./add-visitor";
import { LoginPage } from "../login";
import { Repository } from "../../app/repository/repository";
import { FrequentVisitorPage } from "./frequent-visitor";
import { SocialSharing } from "@ionic-native/social-sharing";

@Component({
  selector: 'page-admin-home',
  template: `

    <ion-header>
      <ion-navbar>
        <ion-buttons right>
          <button ion-button icon-only (click)="logout()">
            <ion-icon name="ios-power-outline"></ion-icon>
          </button>
        </ion-buttons>
        <ion-title>
          Admin Dashboard
        </ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content class="vertical-align-content" text-center>
      <ion-grid style="padding: 0;margin: 0;">
        <ion-row style="height:47vh;display: table;">
          <ion-col col-6 style="background-color: #ECF6EE;display: table-cell;vertical-align: middle;"
                   (click)="addVisitor()">
            <ion-icon style="zoom:5;color:#42A450" name="ios-contacts-outline"></ion-icon>
            <h3>Add Visitor</h3>
          </ion-col>
          <ion-col col-6 style="display: table-cell;vertical-align: middle;" (click)="todayLog()">
            <ion-icon style="zoom:5;color:#42A450" name="ios-calendar-outline"></ion-icon>
            <h3>Today's Log</h3>
          </ion-col>
        </ion-row>
        <ion-row style="height:47vh;display: table;">
          <ion-col col-6 style="display: table-cell;vertical-align: middle;" (click)="visitorLog()">
            <ion-icon style="zoom:5;color:#42A450" name="ios-archive-outline"></ion-icon>
            <h3>Visitor Log</h3>
          </ion-col>
          <ion-col col-6 style="background-color: #ECF6EE;display: table-cell;vertical-align: middle;"
                   (click)="addFlatOwner()">
            <ion-icon style="zoom:5;color:#42A450" name="ios-paper-outline"></ion-icon>
            <h3>Add Flat Owner</h3>
          </ion-col>
        </ion-row>
        <ion-row style="height:47vh;display: table;">
          <ion-col col-6 style="background-color:#ECF6EE;display: table-cell;vertical-align: middle;"
                   (click)="frequentVisitor()">
            <ion-icon style="zoom:5;color:#42A450" name="ios-people-outline"></ion-icon>
            <h3>Frequent Visitor</h3>
          </ion-col>
          <ion-col col-6 style="display: table-cell;vertical-align: middle;" (click)="share()">
            <ion-icon style="zoom:5;color:#42A450" name="ios-share-outline"></ion-icon>
            <h3>Share App</h3>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>

  `,
  styles: [`

  `]
})
export class AdminHomePage {

  constructor(public navCtrl: NavController, public service: Service,
              private datePicker: DatePicker, private toast: ToastService,
              private repository: Repository, private socialSharing: SocialSharing) {

  }

  visitorLog() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      (date) => {
        this.navCtrl.push(VisitorLogPage, { 'date': date, 'user': 'admin' });
      },
      (err) => {
        this.toast.error('Error occurred while getting date');
      }
    );
  }

  todayLog() {
    const date = new Date().toLocaleDateString();
    console.log(date);
    this.navCtrl.push(VisitorLogPage, { 'date': date, 'user': 'admin' });
  }

  addFlatOwner() {
    this.navCtrl.push(AddFlatOwnerPage);
  }

  addVisitor() {
    this.navCtrl.push(AddVisitorPage);
  }

  logout() {
    this.repository.adminLogout();
    this.navCtrl.setRoot(LoginPage)
  }

  frequentVisitor() {
    this.navCtrl.push(FrequentVisitorPage);

  }

  share() {
    this.socialSharing.share("Download this awesome app",null,null,"https://play.google.com/store/search?q=homantra&hl=en")
      .then(() => {
        console.log("shareViaWhatsApp: Success");
      }).catch(() => {
      console.error("shareViaWhatsApp: failed");
    });
  }


}
