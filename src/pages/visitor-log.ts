import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'page-visitor-log',
  template: `

    <ion-content padding>
      {{newDate}}
    </ion-content>
  `,
  styles: [`

  `]
})
export class VisitorLogPage implements OnInit {
  date: Date;
  newDate;

  constructor(private navParams: NavParams, public datepipe: DatePipe) {

  }

  ngOnInit() {
    this.date = this.navParams.get('date');
    this.newDate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  }

}
