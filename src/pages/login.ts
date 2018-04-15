import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../app/services/toast-service";
import {HomePage} from "./home/home";
import {AdminHomePage} from "./Admin/home";
import {Repository} from "../app/repository/repository";

@Component({
  selector: 'page-login',
  template: `

    <ion-content padding>
      <div>
        <form [formGroup]="loginForm" (submit)="loginForm.valid ">
          <ion-grid>
            <ion-row col-md-10 offset-md-1>
              <ion-item>
                <ion-label floating>Username</ion-label>
                <ion-input formControlName="username" type="text"></ion-input>
              </ion-item>
              <ion-item no-lines *ngIf="loginForm.get('username').invalid &&loginForm.get('username').touched">
                <p style="color:red;">Username is Required</p>
              </ion-item>
            </ion-row>
            <ion-row col-md-10 offset-md-1>
              <ion-item>
                <ion-label floating>Password</ion-label>
                <ion-input formControlName="password" type="password"></ion-input>
              </ion-item>
              <ion-item no-lines *ngIf="loginForm.get('password').invalid && loginForm.get('password').touched ">
                <p style="color:red;" *ngIf="loginForm.get('password').hasError('required');">Password is Required</p>
                <p style="color:red;" *ngIf="!loginForm.get('password').hasError('required');">Minimum length of
                  password is 8</p>
              </ion-item>
            </ion-row>
            <div align="center" style="margin-top: 25px;">
              <button style="width:40%" ion-button round outline small type="button"
                      [disabled]="!loginForm.valid && loginForm.touched" (click)="loginUser()">
                Login as User
              </button>
              <button style="width:40%" ion-button round outline small type="button"
                      [disabled]="!loginForm.valid && loginForm.touched " (click)="loginAdmin()">
                Login as Admin
              </button>
            </div>
          </ion-grid>
        </form>
      </div>
    </ion-content>
  `,
  styles: [`

  `]
})
export class LoginPage {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(public navCtrl: NavController,
              private toast: ToastService,
              public loadingCtrl: LoadingController,
              public repository: Repository) {

    //this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.username = new FormControl(null, Validators.required);
    this.password = new FormControl(null, Validators.required);
    //this.password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  loginUser() {
    const loader = this.loadingCtrl.create({
      content: 'Signing you In...'
    });
    loader.present();
    this.repository.loginUser(this.loginForm.value).subscribe((res) => {
      loader.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, error => {
      loader.dismiss();
      this.toast.error(error.error.error);
    })

  }

  loginAdmin() {
    const loader = this.loadingCtrl.create({
      content: 'Signing you In...'
    });
    loader.present();
    this.repository.loginAdmin(this.loginForm.value).subscribe((res) => {
      loader.dismiss();
      this.navCtrl.setRoot(AdminHomePage);
    }, error => {
      loader.dismiss();
      this.toast.error(error.error.error);
    })

  }


}
