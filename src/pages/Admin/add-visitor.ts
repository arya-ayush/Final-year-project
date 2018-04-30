import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingController, NavController} from "ionic-angular";
import {ToastService} from "../../app/services/toast-service";
import {Repository} from "../../app/repository/repository";
import {Visitor} from "../../app/models/visitor";

@Component({
  selector: 'page-add-visitor',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Add Visitor</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <form [formGroup]="signupForm" (submit)="signupForm.valid && addVisitor()">
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
        <ion-item>
          <ion-label floating>Block</ion-label>
          <ion-input formControlName="block" type="text"></ion-input>
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
              <button  [disabled]="!signupForm.valid && signupForm.touched " ion-button type="submit" outline round>
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
export class AddVisitorPage {
  signupForm: FormGroup;
  name: FormControl;
  mobile: FormControl;
  address: FormControl;
  block: FormControl;
  purpose: FormControl;
  flatNumber: FormControl;
  constructor(public navCtrl: NavController, private toast: ToastService,
              private repository: Repository, private loadingCtrl: LoadingController) {
    this.name = new FormControl(null, [Validators.required, Validators.minLength(3)]);
    this.mobile = new FormControl(null, [Validators.required,
      Validators.minLength(10), Validators.maxLength(10)]);
    this.address = new FormControl(null, [Validators.required]);
    this.purpose = new FormControl(null, [Validators.required]);
    this.block = new FormControl(null);
    this.flatNumber = new FormControl(null , [Validators.required]);

    this.signupForm = new FormGroup({
      name: this.name,
      mobile: this.mobile,
      address: this.address,
      purpose: this.purpose,
      block: this.block,
      flatNumber: this.flatNumber,
    })
  }

  addVisitor() {
    const loader = this.loadingCtrl.create({
      content: 'Registering Visitor...'
    });
    loader.present();
    this.repository.addVisitor(this.signupForm.value).subscribe(res => {
        loader.dismiss();
        this.navCtrl.pop();
        this.toast.success('Visitor Added Successfully');
        console.log(res);
      },
      err => {
        loader.dismiss();
        this.toast.error(err.error.error);
      })
  }
}
