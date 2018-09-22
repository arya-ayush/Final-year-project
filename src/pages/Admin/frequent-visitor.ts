import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Visitor } from "../../app/models/visitor";
import { Repository } from "../../app/repository/repository";
import { AlertController, LoadingController, NavController } from "ionic-angular";
import { ToastService } from "../../app/services/toast-service";
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";

@Component({
  selector: 'page-admin-home',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-buttons right>
          <button ion-button icon-only (click)="logout()">
            <ion-icon name="ios-power-outline"></ion-icon>
          </button>
        </ion-buttons>
        <ion-title>
          Frequent Visitor
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <img padding style="margin-top: 40px;" src="./assets/imgs/homantra.png"/>
      <div>
        <form [formGroup]="frequentVisitorForm" (submit)="frequentVisitorForm.valid ">
          <ion-row col-md-10 offset-md-1>
            <ion-item>
              <ion-label floating>Visitor ID</ion-label>
              <ion-input formControlName="visitorID" type="text"></ion-input>
            </ion-item>
          </ion-row>
          <div align="center" style="margin-top: 25px;">
            <button style="width:80%" ion-button round outline small type="button"
                    (click)="addVisitor()">
              Add Visitor
            </button>
          </div>
        </form>
      </div>
    </ion-content>

  `,
  styles: [`

  `]
})
export class FrequentVisitorPage implements OnInit {

  frequentVisitorForm: FormGroup;
  visitorID: FormControl;
  notify;
  index;
  mobileNumber: string = '';
  message: string = '';
  visitor: Visitor;

  constructor(public navCtrl: NavController, private toast: ToastService, private alertCtrl: AlertController,
              private repository: Repository, private loadingCtrl: LoadingController, private camera: Camera,
              private file: File) {
    this.visitorID = new FormControl(null, [Validators.required, Validators.minLength(1)]);
    this.frequentVisitorForm = new FormGroup({
      visitorID: this.visitorID,
    })
  }

  ngOnInit(): void {

  }

  // TODO id of the visitor will be send which will return visitor object and then post API of adding visitor will be called.
  addVisitor() {
    const loader = this.loadingCtrl.create({
      content: 'Registering Visitor...'
    });
    loader.present();
    let formData = new FormData();
    formData.append('name', 'Malay shah');
    formData.append('phone', '7738535020')
    formData.append('address', 'Vallabh Solution');
    formData.append('block', 'a');
    formData.append('purpose', 'owner');
    formData.append('flat_num', '1');
    this.repository.addVisitor(formData).subscribe(res => {
        this.notify = res.notify;
        if (this.notify.length != 0) {
          this.message = 'Malay shah' + ' is visiting your flat for ' + 'owner';
          for (this.index = 0; this.index < this.notify.length; this.index++) {
            if (this.index == this.notify.length - 1) {
              this.mobileNumber = this.mobileNumber + this.notify[this.index].phone;
            }
            else {
              this.mobileNumber = this.mobileNumber + this.notify[this.index].phone + ',';
            }
          }
          this.repository.sendSms(this.mobileNumber, this.message).subscribe(res => {
              this.navCtrl.pop();
              loader.dismiss();
              this.toast.success('Visitor Added Successfully and Sms Sent');
            },
            err => {
              loader.dismiss();
              this.toast.error('Visitor added, Sms not sent');
            })
        }
      },
      err => {
        loader.dismiss();
        this.toast.error(err.error.error);
      })
  }


}
