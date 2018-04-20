import {Component, OnInit} from '@angular/core';
import {NavController} from "ionic-angular";
import {SignupMemberPage} from "./signup-member";
import {Member} from "../app/models/member";
import {Repository} from "../app/repository/repository";

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
          <ion-col *ngIf="length>0 && !loading" col-sm-12 col-md-4 md-offset-4>
            <ion-card *ngFor="let member of members"> 
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
          <ion-col style="margin-top:38vh;" *ngIf="length==0 && !loading" col-sm-12 col-md-4 md-offset-4>
            <h3>You have not added any member yet</h3>
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
export class AddMemberPage implements OnInit{
  members : Member[] = [];
  loading = false;
  length: number;
  constructor(public navCtrl: NavController,public repository: Repository) {
  }

  addMember() {
    this.navCtrl.push(SignupMemberPage);
  }

  ngOnInit(){
    this.loading = true;
    const members$ = this.repository.getMembers();
    members$[0].subscribe(members => {
      this.members = members;
      this.length = this.members.length;
      this.loading = false;
    });
  }

}
