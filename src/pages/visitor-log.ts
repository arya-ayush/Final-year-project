import { Component, OnInit } from "@angular/core";
import { LoadingController, NavParams } from "ionic-angular";
import { DatePipe } from "@angular/common";
import { Repository } from "../app/repository/repository";
import { Visitor } from "../app/models/visitor";
import { ToastService } from "../app/services/toast-service";
import * as moment from "moment";

@Component({
  selector: "page-visitor-log",
  template: `

    <ion-header>
      <ion-navbar>
        <ion-title>Visitors</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col *ngIf="length>0 && !loading" col-sm-12>
            <ion-card *ngFor="let visitor of visitorLog">
              <ion-card-content>
                <ion-grid>
                  <ion-row>
                    <ion-col style="width: fit-content" col-8>
                      <ion-item style="width: fit-content">
                        <ion-icon item-start name="ios-contact-outline"></ion-icon>
                        <h3>{{visitor.name}}</h3>
                      </ion-item>
                      <ion-item style="width: fit-content">
                        <ion-icon item-start name="ios-call-outline"></ion-icon>
                        <h3>{{visitor.phone}}</h3>
                      </ion-item>
                      <ion-item style="width: fit-content">
                        <ion-icon item-start name="ios-people-outline"></ion-icon>
                        <h3>{{visitor.purpose}}</h3>
                      </ion-item>
                      <h2 *ngIf="user == 'admin'">Visited In:</h2>
                      <ion-item style="width: fit-content" *ngIf="user == 'admin'">
                        <ion-icon item-start name="ios-home-outline"></ion-icon>
                        <h3>Block : {{visitor.society.block}}</h3>
                        <h3>Flat : {{visitor.society.flat_num}}</h3>
                      </ion-item>
                    </ion-col>
                    <ion-col col-4 *ngIf="visitor.image != null">
                      <img src="{{linkForImage(visitor.image)}}" alt="Image is Missing!" style="width: 350px; height:100px"/>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col style="margin-top:38vh;" *ngIf="length==0 && !loading" col-sm-12>
            <p style="text-align: center">No visitors on your selected date</p>
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
  user;
  visitorLog: Visitor[];

  constructor(private navParams: NavParams, public datepipe: DatePipe,
              public repository: Repository, public loadingCtrl: LoadingController,
              public toast: ToastService) {

  }

  ngOnInit() {
    this.loading = true;
    this.date = this.navParams.get("date");
    this.user = this.navParams.get("user");
    this.newDate = moment(this.date, "DD/MM/YYYY").format("YYYY-MM-DD");
    const loader = this.loadingCtrl.create({
      content: "Getting Visitor List..."
    });
    loader.present();
    if (this.user == "user") {
      this.repository.getVisitor(this.newDate).subscribe((res: Visitor[]) => {
        this.visitorLog = res;
        console.log(this.visitorLog);
        this.length = this.visitorLog.length;
        loader.dismiss();
        this.loading = false;
      }, error => {
        loader.dismiss();
        this.toast.error(error.error.error);
        this.loading = false;
      })
    }
    else {
      this.repository.getAllVisitor(this.newDate).subscribe((res: Visitor[]) => {
        this.visitorLog = res;
        this.length = this.visitorLog.length;
        loader.dismiss();
        this.loading = false;
      }, error => {
        loader.dismiss();
        this.toast.error(error.error.error);
        this.loading = false;
      })
    }

  }

  linkForImage(image) {
    const link: string = "http://vallabh-final.herokuapp.com" + image;
    return link;
  }
}
