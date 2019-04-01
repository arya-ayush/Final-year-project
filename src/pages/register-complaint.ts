import {Component} from '@angular/core';
import {LoadingController, NavController} from "ionic-angular";
import {ToastService} from "../app/services/toast-service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Repository } from '../app/repository/repository';

@Component({
  selector: 'page-register-complaint',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Register Complaint</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <form [formGroup]="complainForm" (submit)="complainForm.valid && registerCompalin()">
        <ion-grid>
          <ion-row>
            <ion-col col-sm-12>
              <ion-item>
                <ion-textarea formControlName="complain" placeholder="Enter your complain here" rows="5"></ion-textarea>
              </ion-item>
              <ion-item no-lines *ngIf="complainForm.invalid && complainForm.touched" style="margin-bottom:0px;">
                <p style="color:red;">Complain cannot be empty</p>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col col-md-5 col-sm-4></ion-col>
            <ion-col>
              <button [disabled]="!complainForm.valid " ion-button type="submit" outline round>
                Register Complain
              </button>
            </ion-col>
            <ion-col col-md-5 col-sm-4></ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-content>
  `,
  styles: [`

  `]
})
export class AddComplaintsPage {
  complainForm: FormGroup;
  complain: FormControl;
  constructor(public navCtrl: NavController, private repository: Repository,
              private toast: ToastService,
              private loadingCtrl: LoadingController) {
    this.complain = new FormControl(null, [Validators.required]);
    this.complainForm = new FormGroup({
      complain: this.complain,
    })
  }

  registerCompalin() {
    let allComplains = [];
    const complains = JSON.parse(localStorage.getItem("complaint"));
    if(complains) {
      allComplains.push(...complains)
    }
    const loader = this.loadingCtrl.create({
      content: 'Sending your complaint.'
    });
    loader.present();
    console.log(this.complainForm.value);
    this.repository.registerComplain(this.complainForm.value).subscribe(res => {
      allComplains.push(this.complainForm.value);
      localStorage.setItem("complaint", JSON.stringify(allComplains));
      loader.dismiss();
      this.navCtrl.pop();
      this.toast.success("Complaint registered successfully");
    },(err) => {
      loader.dismiss();
      this.toast.error("Some error occurred. Please try again.");
    });

  }

}
