import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingController, NavController} from "ionic-angular";
import {ToastService} from "../../app/services/toast-service";
import {Repository} from "../../app/repository/repository";

@Component({
  selector: 'page-add-flat-owner',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Add Owner</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <form [formGroup]="signupForm" (submit)="signupForm.valid && addOwner()">
        <ion-item>
          <ion-label floating>User Name</ion-label>
          <ion-input formControlName="name"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('name').invalid &&
           signupForm.get('name').touched" style="margin-bottom:0px;">
          <p style="color:red;" *ngIf="signupForm.get('name').hasError('required');">User Name is Required</p>
          <p style="color:red;" *ngIf="!signupForm.get('name').hasError('required');">Minlength should be 3</p>
        </ion-item>
        <ion-item>
          <ion-label floating>Email</ion-label>
          <ion-input formControlName="email" type="email"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('email').invalid &&
           signupForm.get('email').touched" style="margin-bottom:0px;">
          <p style="color:red;" *ngIf="signupForm.get('email').hasError('required');">Email is Required</p>
          <p style="color:red;" *ngIf="!signupForm.get('email').hasError('required');">Email is Invalid</p>
        </ion-item>
        <ion-item>
          <ion-label floating>Password</ion-label>
          <ion-input formControlName="password" type="password"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('password').invalid &&
           signupForm.get('password').touched" style="margin-bottom:0px;">
          <p style="color:red;" *ngIf="signupForm.get('password').hasError('required');">Password is Required</p>
          <p style="color:red;" *ngIf="!signupForm.get('password').hasError('required');">Minimum Length should be 8</p>
        </ion-item>
        <ion-item>
          <ion-label floating>Mobile Number</ion-label>
          <ion-input formControlName="mobile" type="number"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('mobile').invalid &&
           signupForm.get('mobile').touched" style="margin-bottom:0px;">
          <p style="color:red;" *ngIf="signupForm.get('mobile').hasError('required');">Mobile Number is Required</p>
          <p style="color:red;" *ngIf="!signupForm.get('mobile').hasError('required');">Length should be 10</p>
        </ion-item>
        <ion-item>
          <ion-label floating>Block</ion-label>
          <ion-input formControlName="block" type="text"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('block').invalid &&
           signupForm.get('block').touched" style="margin-bottom:0px;">
          <p style="color:red;">Block is Required</p>
        </ion-item>
        <ion-item>
          <ion-label floating>Flat Number</ion-label>
          <ion-input formControlName="flatNumber" type="text"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('flatNumber').invalid &&
           signupForm.get('flatNumber').touched" style="margin-bottom:0px;">
          <p style="color:red;">Flat Number is Required</p>
        </ion-item>
        <div style="border-bottom: 0.55px solid #c3c4cc;margin:0;padding:0;">
          <ion-list radio-group (ionChange)="genderChanged($event)" margin-top no-lines style="margin-bottom:6px;">
            <ion-item>
              <ion-label>Male</ion-label>
              <ion-radio value="M" checked></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Female</ion-label>
              <ion-radio value="F"></ion-radio>
            </ion-item>
          </ion-list>
        </div>
        
        <div style="height:10px"></div>
        <ion-grid>
          <ion-row>
            <ion-col col-md-5 col-sm-4></ion-col>
            <ion-col>
              <button  [disabled]="!signupForm.valid && signupForm.touched " ion-button type="submit" outline round>
                Add Owner
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
export class AddFlatOwnerPage {
  signupForm: FormGroup;
  name: FormControl;
  email: FormControl;
  mobile: FormControl;
  password: FormControl;
  gender: FormControl;
  block: FormControl;
  flatNumber: FormControl;
  constructor(public navCtrl: NavController, private toast: ToastService,
              private repository: Repository, private loadingCtrl: LoadingController) {
    this.name = new FormControl(null, [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl(null, [Validators.required, , Validators.email]);
    this.mobile = new FormControl(null, [Validators.required,
      Validators.minLength(10), Validators.maxLength(10)]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    this.block = new FormControl(null);
    this.flatNumber = new FormControl(null , [Validators.required]);
    this.gender = new FormControl('M', [Validators.required]);


    this.signupForm = new FormGroup({
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      password: this.password,
      block: this.block,
      flatNumber: this.flatNumber,
      gender: this.gender
    })
  }

  genderChanged(value) {
    this.signupForm.patchValue({gender: value});
  }

  addOwner() {
    const loader = this.loadingCtrl.create({
      content: 'Adding Member...'
    });
    loader.present();
    this.repository.addOwner(this.signupForm.value).subscribe(res => {
        loader.dismiss();
        this.navCtrl.pop();
        this.toast.success('Flat Owner Added Successfully');
      },
      err => {
        loader.dismiss();
        this.toast.error(err.error.error);
      })
  }
}
