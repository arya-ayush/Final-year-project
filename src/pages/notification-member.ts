import {Component, OnInit} from '@angular/core';
import {ToastService} from "../app/services/toast-service";
import {Repository} from "../app/repository/repository";
import {LoadingController} from "ionic-angular";
import {Member} from "../app/models/member";
import {Visitor} from "../app/models/visitor";

@Component({
  selector: 'page-notification-member',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Notification Member</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col style="margin-top: 38vh;" *ngIf="length == 0 && !loading">
            You have not added any notification member yet
          </ion-col>
          <ion-col *ngIf="length>0 && !loading" col-sm-12 col-md-4 md-offset-4>
            <ion-card *ngFor="let member of notificationMemnber">
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
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [`

  `]
})
export class NotificationMemberPage implements OnInit{
  loading : boolean = false;
  length: number = 0;
  notificationMemnber : Member[];

  constructor(public repository: Repository, public loadingCtrl : LoadingController, private toast:ToastService) {

  }

  ngOnInit(){
    const loader = this.loadingCtrl.create({
      content: 'Getting Notification Member...'
    });
    loader.present();
    this.loading = true;
    this.repository.getNotificationMember().subscribe( (res: Member[]) => {
      this.notificationMemnber = res;
      this.length = this.notificationMemnber.length;
      loader.dismiss();
      this.loading = false;
    },error => {
      loader.dismiss();
      this.toast.error(error.error.error);
      this.loading = false;
    });
  }
}
