import { Component, OnInit } from '@angular/core';
import { Repository } from '../app/repository/repository';

@Component({
  selector: 'page-view-complaint',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Complaints</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col *ngIf="complaints && !loading" col-sm-12>
            <ion-card *ngFor="let complain of complaints">
              <ion-card-content>
                <ion-card-title textwrap style="font-size: 20px">{{complain.complain}}</ion-card-title>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col style="margin-top:38vh;" *ngIf="!complaints && !loading" col-sm-12>
            <p>You have not added any complaint yet</p>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [`

  `]
})
export class ViewComplaintsPage implements OnInit{
  loading = true;
  complaints = [];
  constructor(private repository: Repository) {

  }

  ngOnInit() {
    this.repository.getComplaints().subscribe(res => {
      this.complaints = res;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

}
