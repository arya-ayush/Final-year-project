import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
export class FrequentVisitorPage implements OnInit{

  frequentVisitorForm: FormGroup;
  visitorID: FormControl;

  constructor() {
    this.visitorID = new FormControl(null, [Validators.required, Validators.minLength(1)]);
    this.frequentVisitorForm = new FormGroup({
      visitorID: this.visitorID,
    })
  }

  ngOnInit(): void {

  }

  // TODO id of the visitor will be send which will return visitor object and then post API of adding visitor will be called.
  addVisitor(){

  }




}
