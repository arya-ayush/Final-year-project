import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfilePage} from "../profile";
import {Service} from "../../app/services/service";

@Component({
  selector: 'page-admin-home',
  template: `

    <ion-header>
      <ion-navbar>
        <ion-title>
          Admin Dashboard
        </ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content class="vertical-align-content" text-center>
      <ion-grid style="padding: 0;margin: 0;">
        <ion-row  style="height:47.5vh;display: table;">
          <ion-col col-6 style="background-color: #ECF6EE;display: table-cell;vertical-align: middle;" >
            <ion-icon style="zoom:5;color:#42A450" name="ios-contacts-outline"></ion-icon>
            <h3>Add Visitor</h3>
          </ion-col>
          <ion-col col-6 style="display: table-cell;vertical-align: middle;">
            <ion-icon style="zoom:5;color:#42A450" name="ios-calendar-outline"></ion-icon>
            <h3>Today's Log</h3>
          </ion-col>
        </ion-row>
        <ion-row style="height:47.5vh;display: table;">
          <ion-col col-6 style="display: table-cell;vertical-align: middle;">
            <ion-icon style="zoom:5;color:#42A450" name="ios-alarm-outline"></ion-icon>
            <h3>Visitor Log</h3>
          </ion-col>
          <ion-col col-6  style="background-color: #ECF6EE;display: table-cell;vertical-align: middle;">
            <ion-icon style="zoom:5;color:#42A450" name="ios-person-outline"  ></ion-icon>
            <h3>Feedback</h3>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>

  `,
  styles: [`

  `]
})
export class AdminHomePage {

  constructor(public navCtrl: NavController, public service:Service) {

  }
}
