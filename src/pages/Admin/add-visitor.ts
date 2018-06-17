import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController, NavController} from "ionic-angular";
import {ToastService} from "../../app/services/toast-service";
import {Repository} from "../../app/repository/repository";

@Component({
  selector: 'page-add-visitor',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Add Visitor</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content *ngIf="loading == false" padding>
      <form [formGroup]="signupForm" (submit)="signupForm.valid && sendOtp()">
        <ion-item>
          <ion-label floating>Name</ion-label>
          <ion-input formControlName="name"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('name').invalid &&
           signupForm.get('name').touched" style="margin-bottom:0px;">
          <p style="color:red;" *ngIf="signupForm.get('name').hasError('required');">User Name is Required</p>
          <p style="color:red;" *ngIf="!signupForm.get('name').hasError('required');">Minlength should be 3</p>
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
          <ion-label floating>Address</ion-label>
          <ion-input formControlName="address" type="text"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('address').invalid &&
           signupForm.get('address').touched" style="margin-bottom:0px;">
          <p style="color:red;">Address is Required</p>
        </ion-item>
        <h4 style="text-align:center;">Visiting To:</h4>
        <!--<ion-item>-->
          <!--<ion-label floating>Block</ion-label>-->
          <!--<ion-input formControlName="block" type="text"></ion-input>-->
        <!--</ion-item>-->
        <ion-item>
          <ion-label>Block</ion-label>
          <ion-select formControlName="block">
            <ion-option value="f">Female</ion-option>
            <ion-option value="m">Male</ion-option>
            <ion-option *ngFor="let block of blocks" [value]="block">{{block}}</ion-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label floating>Flat Number</ion-label>
          <ion-input formControlName="flatNumber" type="text"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('flatNumber').invalid &&
           signupForm.get('flatNumber').touched" style="margin-bottom:0px;">
          <p style="color:red;">Flat Number is Required</p>
        </ion-item>
        <ion-item>
          <ion-label floating>Purpose</ion-label>
          <ion-input formControlName="purpose" type="text"></ion-input>
        </ion-item>
        <ion-item no-lines *ngIf="signupForm.get('purpose').invalid &&
           signupForm.get('purpose').touched" style="margin-bottom:0px;">
          <p style="color:red;">Purpose is Required</p>
        </ion-item>
        <div style="height:10px"></div>
        <ion-grid>
          <ion-row>
            <ion-col col-md-5 col-sm-4></ion-col>
            <ion-col>
              <button [disabled]="!signupForm.valid && signupForm.touched " ion-button type="submit" outline round>
                Add Visitor
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
export class AddVisitorPage implements OnInit {
  loading : boolean = true;
  blocks : string[] = [];
  signupForm: FormGroup;
  name: FormControl;
  mobile: FormControl;
  address: FormControl;
  block: FormControl;
  purpose: FormControl;
  flatNumber: FormControl;
  notify;
  index;
  mobileNumber: string = '';
  message: string = '';

  constructor(public navCtrl: NavController, private toast: ToastService, private alertCtrl: AlertController,
              private repository: Repository, private loadingCtrl: LoadingController) {
    this.name = new FormControl(null, [Validators.required, Validators.minLength(3)]);
    this.mobile = new FormControl(null, [Validators.required,
      Validators.minLength(10), Validators.maxLength(10)]);
    this.address = new FormControl(null, [Validators.required]);
    this.purpose = new FormControl(null, [Validators.required]);
    this.block = new FormControl(null);
    this.flatNumber = new FormControl(null, [Validators.required]);

    this.signupForm = new FormGroup({
      name: this.name,
      mobile: this.mobile,
      address: this.address,
      purpose: this.purpose,
      block: this.block,
      flatNumber: this.flatNumber,
    })
  }

  ngOnInit() {
    this.loading = true;
    const loader = this.loadingCtrl.create({
      content: 'Fetching Block List...Please Wait'
    });
    loader.present();
    this.repository.getBlockList().subscribe((res: string[]) => {
      this.blocks = res.blocks;
      console.log('Block list is');
      console.log(this.blocks);
      loader.dismiss();
      this.loading = false;
    }, error => {
      loader.dismiss();
      this.toast.error(error.error.error);
      this.loading = false;
    })

  }

  sendOtp() {
    this.repository.sendOtp(this.mobile.value).subscribe(res => {
      this.toast.success('OTP send successfully');
      this.presentPrompt();
    }, err => {
      this.toast.error('Couldnot Send OTP');
    })
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Enter the OTP send to your mobile number',
      inputs: [
        {
          name: 'otp',
          placeholder: 'OTP',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Verify',
          handler: data => {
            this.repository.verifyOtp(data.otp, this.mobile.value).subscribe(res => {
              if (res.type == 'success') {
                this.addVisitor();
              }
              else {
                this.toast.error('OTP doesnot match');
              }

            }, err => {
              this.toast.error('OTP cannot be verified');
            });
          }
        }
      ]
    });
    alert.present();
  }

  addVisitor() {
    const loader = this.loadingCtrl.create({
      content: 'Registering Visitor...'
    });
    loader.present();
    console.log(this.signupForm.value);
    this.repository.addVisitor(this.signupForm.value).subscribe(res => {
        this.notify = res.notify;
        if (this.notify.length != 0) {
          this.message = this.name.value + ' from ' + this.address.value + ' is visiting your flat for ' + this.purpose.value;
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
              console.log(err);
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
