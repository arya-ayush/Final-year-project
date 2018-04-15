import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {SignupMemberPage} from "./signup-member";

@Component({
  selector: 'page-add-member',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Members</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-fab right bottom padding>
        <button ion-fab (click)="addMember()">
          <ion-icon name="add"></ion-icon>
        </button>
      </ion-fab>
    </ion-content>
  `,
  styles: [`

  `]
})
export class AddMemberPage {
  constructor(public navCtrl: NavController) {

  }

  addMember() {
    this.navCtrl.push(SignupMemberPage);
  }
}
