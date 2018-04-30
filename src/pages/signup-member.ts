import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingController, NavController, NavParams} from "ionic-angular";
import {ToastService} from "../app/services/toast-service";
import {Repository} from "../app/repository/repository";

@Component({
  selector: 'page-add-member',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>{{text}}</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <form [formGroup]="signupForm" (submit)="signupForm.valid && addMember()">
        <ion-item>
          <ion-label floating>Name</ion-label>
          <ion-input formControlName="name"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('name').invalid &&
           signupForm.get('name').touched" style="margin-bottom:0px;">
          <p style="color:red;" *ngIf="signupForm.get('name').hasError('required');">Name is Required</p>
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
          <ion-label floating>Mobile Number</ion-label>
          <ion-input formControlName="mobile" type="number"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('mobile').invalid &&
           signupForm.get('mobile').touched" style="margin-bottom:0px;">
          <p style="color:red;" *ngIf="signupForm.get('mobile').hasError('required');">Mobile Number is Required</p>
          <p style="color:red;" *ngIf="!signupForm.get('mobile').hasError('required');">Length should be 10</p>
        </ion-item>
        <div style="border-bottom: 0.55px solid #c3c4cc;margin:0;padding:0;">
          <ion-list radio-group (ionChange)="genderChanged($event)" margin-top no-lines style="margin-bottom:6px;">
            <ion-item>
              <ion-label>Male</ion-label>
              <ion-radio value="M" [checked]="!member || member.gender=='M' "></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Female</ion-label>
              <ion-radio value="F" [checked]="member && member.gender=='F' "></ion-radio>
            </ion-item>
          </ion-list>
        </div>
        <ion-item style="margin-top:8px;">
          <ion-label>Notify Member of Visitor</ion-label>
          <ion-toggle [(ngModel)]='default' [ngModelOptions]="{standalone: true}"
                      (ionChange)="notificationChanged($event)"></ion-toggle>
        </ion-item>
        <div style="height:10px"></div>
        <ion-grid>
          <ion-row>
            <ion-col col-md-5 col-sm-4></ion-col>
            <ion-col>
              <button [disabled]="!signupForm.valid && signupForm.touched " ion-button type="submit" outline round>
                {{text}}
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
export class SignupMemberPage {
  signupForm: FormGroup;
  name: FormControl;
  email: FormControl;
  mobile: FormControl;
  gender: FormControl;
  notificationMember: FormControl;
  member;
  text: string;
  default: boolean;

  constructor(public navCtrl: NavController, private toast: ToastService,
              private repository: Repository, private navParams: NavParams,
              private loadingCtrl: LoadingController) {
    this.member = this.navParams.get('member');
    if (this.member) {
      this.text = 'Update Member';
      this.default = this.member.is_notification_member;
    }
    else {
      this.text = 'Add Member';
      this.default = false;
    }
    this.name = new FormControl(this.member ? this.member.name : null, [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl(this.member ? this.member.email : null, [Validators.required, , Validators.email]);
    this.mobile = new FormControl(this.member ? this.member.phone : null, [Validators.required,
      Validators.minLength(10), Validators.maxLength(10)]);
    this.gender = new FormControl(this.member ? this.member.gender : 'M', [Validators.required]);
    this.notificationMember = new FormControl(this.member ? this.member.is_notification_member : 'False', [Validators.required]);

    this.signupForm = new FormGroup({
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      gender: this.gender,
      is_notification_member: this.notificationMember
    })
  }

  genderChanged(value) {
    this.signupForm.patchValue({gender: value});
  }

  notificationChanged(value) {
    if (value.value == false) {
      this.signupForm.patchValue({is_notification_member: 'false'});
    }
    else {
      this.signupForm.patchValue({is_notification_member: 'true'});
    }
  }

  addMember() {
    if (this.member) {
      const loader = this.loadingCtrl.create({
        content: 'Updating Member...'
      });
      loader.present();
      this.repository.updateMember(this.member.id, this.signupForm.value).subscribe(res => {
          loader.dismiss();
          this.navCtrl.pop();
          this.toast.success('Member Updated Successfully');
        },
        err => {
          loader.dismiss();
          this.toast.error(err.error.error);
        })
    }
    else {
      const loader = this.loadingCtrl.create({
        content: 'Adding Member...'
      });
      loader.present();
      this.repository.addMember(this.signupForm.value).subscribe(res => {
          loader.dismiss();
          this.navCtrl.pop();
          this.toast.success('Member Added Successfully');
        },
        err => {
          loader.dismiss();
          this.toast.error(err.error.error);
        })
    }
  }
}
