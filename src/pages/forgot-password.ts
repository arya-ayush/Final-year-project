import {Component} from '@angular/core';
import {LoadingController, NavController} from "ionic-angular";
import {ToastService} from "../app/services/toast-service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Repository } from '../app/repository/repository';
import { ChangePasswordPage } from './change-password';

@Component({
  selector: 'page-forgot-password',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Forgot Password</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <form [formGroup]="passwordForm" (submit)="passwordForm.valid && forgotPassword()">
        <ion-grid>
          <ion-row>
            <ion-item>
              <ion-label floating>Email</ion-label>
              <ion-input formControlName="email" type="text"></ion-input>
            </ion-item>
            <ion-item no-lines *ngIf="passwordForm.invalid &&passwordForm.touched">
              <p style="color:red;" *ngIf="passwordForm.get('email').hasError('required');">Email is Required</p>
              <p style="color:red;" *ngIf="!passwordForm.get('email').hasError('required');">Please enter correct email</p>
            </ion-item>
          </ion-row>
          <ion-row>
            <ion-col col-md-5 col-sm-4></ion-col>
            <ion-col>
              <button [disabled]="!passwordForm.valid " ion-button type="submit" outline round>
                Send Otp
              </button>
            </ion-col>
            <ion-col col-md-5 col-sm-4></ion-col>
          </ion-row>
        </ion-grid>
      </form>
      <p style="text-align: end;margin-right: 20px;margin-top: 20px" (click)="openOtpPage()">Already have OTP?</p>
    </ion-content>
  `,
  styles: [`

  `]
})
export class ForgotPasswordPage {
  passwordForm: FormGroup;
  email: FormControl;
  constructor(public navCtrl: NavController, private repository: Repository,
              private toast: ToastService,
              private loadingCtrl: LoadingController) {
    this.email = new FormControl(null, [Validators.email, Validators.required]);
    this.passwordForm = new FormGroup({
      email: this.email,
    })
  }

  forgotPassword() {
    const loader = this.loadingCtrl.create({
      content: 'Sending OTP to your email address.'
    });
    loader.present();
    this.repository.forgotPassword(this.passwordForm.value).subscribe(res => {
      loader.dismiss();
      this.openOtpPage();
      this.toast.success("Check your email for the OTP");
    },(err) => {
      loader.dismiss();
      this.toast.error(err.error.error);
    });

  }

  openOtpPage() {
    this.navCtrl.push(ChangePasswordPage);
  }
}
