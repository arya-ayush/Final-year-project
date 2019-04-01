import {Component} from '@angular/core';
import {LoadingController, NavController} from "ionic-angular";
import {ToastService} from "../app/services/toast-service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Repository } from '../app/repository/repository';
import { LoginPage } from './login';

@Component({
  selector: 'page-change-password',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Change Password</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <form [formGroup]="passwordForm" (submit)="passwordForm.valid && resetPassword()">
        <ion-grid>
          <ion-row>
            <ion-item>
              <ion-label floating>Email</ion-label>
              <ion-input formControlName="email" type="text"></ion-input>
            </ion-item>
            <ion-item no-lines *ngIf="passwordForm.get('email').invalid &&passwordForm.get('email').touched">
              <p style="color:red;" *ngIf="passwordForm.get('email').hasError('required');">Email is Required</p>
              <p style="color:red;" *ngIf="!passwordForm.get('email').hasError('required');">Please enter correct email</p>
            </ion-item>
          </ion-row>
          <ion-row>
            <ion-item>
              <ion-label floating>OTP</ion-label>
              <ion-input formControlName="code" type="password"></ion-input>
            </ion-item>
            <ion-item no-lines *ngIf="passwordForm.get('code').invalid &&passwordForm.get('code').touched">
              <p style="color:red;">OTP is Required</p>
            </ion-item>
          </ion-row>
          <ion-row>
            <ion-item>
              <ion-label floating>New Password</ion-label>
              <ion-input formControlName="password" type="password"></ion-input>
            </ion-item>
            <ion-item no-lines *ngIf="passwordForm.get('password').invalid &&passwordForm.get('password').touched">
              <p style="color:red;" *ngIf="passwordForm.get('password').hasError('required');">Password is Required</p>
              <p style="color:red;" *ngIf="!passwordForm.get('password').hasError('required');">Minimum length should be 8</p>
            </ion-item>
          </ion-row>
          <ion-row>
            <ion-col col-md-5 col-sm-4></ion-col>
            <ion-col>
              <button [disabled]="!passwordForm.valid " ion-button type="submit" outline round>
                Change Password
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
export class ChangePasswordPage {
  passwordForm: FormGroup;
  email: FormControl;
  code: FormControl;
  password: FormControl;
  constructor(public navCtrl: NavController, private repository: Repository,
              private toast: ToastService,
              private loadingCtrl: LoadingController) {
    this.email = new FormControl(null, [Validators.email, Validators.required]);
    this.code = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    this.passwordForm = new FormGroup({
      email: this.email,
      code: this.code,
      password: this.password
    })
  }

  resetPassword() {
    const loader = this.loadingCtrl.create({
      content: 'Sending request to change your password'
    });
    loader.present();
    console.log(this.passwordForm.value);
    this.repository.changePassword(this.passwordForm.value).subscribe(res => {
      loader.dismiss();
      this.toast.success("Password Changed Successfully");
      this.navCtrl.push(LoginPage);
    },(err) => {
      loader.dismiss();
      this.toast.error(err.error.error);
    });

  }
}
