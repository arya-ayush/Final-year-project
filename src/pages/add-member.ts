import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, NavController} from "ionic-angular";
import {SignupMemberPage} from "./signup-member";
import {Member} from "../app/models/member";
import {Repository} from "../app/repository/repository";
import {ToastService} from "../app/services/toast-service";

@Component({
  selector: 'page-add-member',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Members</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col *ngIf="length>0 && !loading" col-sm-12>
            <ion-card *ngFor="let member of members" (click)="presentAlert(member)">
              <ion-card-content>
                <ion-item>
                  <ion-icon item-start name="ios-contact-outline"></ion-icon>
                  <h3>{{member.name}}</h3>
                </ion-item>
                <ion-item>
                  <ion-icon item-start name="ios-mail-outline"></ion-icon>
                  <h3>{{member.email}}</h3>
                </ion-item>
                <ion-item>
                  <ion-icon item-start name="ios-call-outline"></ion-icon>
                  <h3>{{member.phone}}</h3>
                </ion-item>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col style="margin-top:38vh;" *ngIf="length==0 && !loading" col-sm-12>
            <p>You have not added any member yet</p>
          </ion-col>
        </ion-row>
      </ion-grid>
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
export class AddMemberPage implements OnInit {
  members: Member[] = [];
  loading = false;
  length: number = 0;

  constructor(public navCtrl: NavController, public repository: Repository,
              private alertCtrl: AlertController, private toast: ToastService,
              private loadingCtrl: LoadingController) {
  }

  addMember() {
    this.navCtrl.push(SignupMemberPage);
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({
      content: 'Fetching Member List...'
    });
    loader.present();
    this.loading = true;
    const members$ = this.repository.getMembers();
    members$[0].subscribe(members => {
      this.members = members;
      this.length = this.members.length;
      this.loading = false;
      loader.dismiss();
    });
  }

  presentAlert(member) {
    let alert = this.alertCtrl.create({
      message: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Member',
          handler: () => {
            const loader = this.loadingCtrl.create({
              content: 'Deleting Member...'
            });
            loader.present();
            this.repository.deleteMember(member.id).subscribe(() => {
              loader.dismiss();
              this.toast.success('Member Deleted Successfully');
            },err => {
              loader.dismiss();
              this.toast.error('Some Error Occured');
            });
          }
        },
        {
          text: 'Update Member',
          handler: () => {
            this.navCtrl.push(SignupMemberPage , {'member': member});
          }
        },
        {
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
}
