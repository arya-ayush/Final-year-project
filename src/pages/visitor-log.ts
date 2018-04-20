import {Component, OnInit} from '@angular/core';
import {LoadingController, NavParams} from "ionic-angular";
import {DatePipe} from "@angular/common";
import {Repository} from "../app/repository/repository";
import {Visitor} from "../app/models/visitor";
import {ToastService} from "../app/services/toast-service";

@Component({
  selector: 'page-visitor-log',
  template: `

    <ion-header>
      <ion-navbar>
        <ion-title>Visitors</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col *ngIf="length>0 && !loading" col-sm-12 col-md-4 md-offset-4>
            <ion-card  *ngFor="let visitor of visitorLog">
              <ion-card-content>
                <ion-item>
                  <ion-icon item-start name="ios-contact-outline"></ion-icon>
                  <h3>{{visitor.name}}</h3>
                </ion-item>
                <ion-item>
                  <ion-icon item-start name="ios-call-outline"></ion-icon>
                  <h3>{{visitor.phone}}</h3>
                </ion-item>
                <ion-item>
                  <ion-icon item-start name="ios-home-outline"></ion-icon>
                  <h3>{{visitor.address}}</h3>
                </ion-item>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col style="margin-top:38vh;" *ngIf="length==0 && !loading" col-sm-12 col-md-4 md-offset-4>
            <h3>No visitors on your selected date</h3>
          </ion-col>
          
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [`

  `]
})
export class VisitorLogPage implements OnInit {
  loading: boolean = false;
  date: Date;
  length: number;
  newDate;
  visitorLog : Visitor[];
  constructor(private navParams: NavParams, public datepipe: DatePipe ,
              public repository: Repository, public loadingCtrl : LoadingController,
              public toast:ToastService) {

  }

  ngOnInit() {
    this.loading = true;
    this.date = this.navParams.get('date');
    this.newDate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    const loader = this.loadingCtrl.create({
      content: 'Getting Visitor List...'
    });
    loader.present();
    this.repository.getVisitor(this.newDate).subscribe((res: Visitor[]) => {
      this.visitorLog = res;
      this.length = this.visitorLog.length;
      loader.dismiss();
      this.loading = false;
    },error => {
      loader.dismiss();
      this.toast.error(error.error.error);
      this.loading = false;
    })
  }

}
