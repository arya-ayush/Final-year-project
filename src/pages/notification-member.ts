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
    <ion-content padding>
      
    </ion-content>
  `,
  styles: [`

  `]
})
export class NotificationMemberPage implements OnInit{
  loading : boolean = false;
  length: number;
  notificationMemnber : Member[];

  constructor(public repository: Repository, public loadingCtrl : LoadingController, public toast:ToastService) {

  }

  ngOnInit(){
    const loader = this.loadingCtrl.create({
      content: 'Getting Visitor List...'
    });
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
