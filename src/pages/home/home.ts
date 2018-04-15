import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfilePage} from "../profile";
import {AddMemberPage} from "../add-member";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  showProfile() {
    this.navCtrl.push(ProfilePage);
  }

  add() {
    this.navCtrl.push(AddMemberPage);
  }
}
