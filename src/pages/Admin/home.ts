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

    <ion-content padding>
      Welcome to Admin dashboard
    </ion-content>

  `,
  styles: [`

  `]
})
export class AdminHomePage {

  constructor(public navCtrl: NavController, public service:Service) {

  }
}
