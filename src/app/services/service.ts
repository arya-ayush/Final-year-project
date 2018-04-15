import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {LoadingController} from "ionic-angular";
import {User} from "../models/user";
import {Observable} from "rxjs/Observable";
import {Member} from "../models/member";

const BASE_URL = 'http://vallabh-final.herokuapp.com/';

@Injectable()
export class Service {
  constructor(private http: HttpClient, private loadingCtrl: LoadingController) {
  }

  loginUser(data: { username: string, password: string }): any {
    console.log(data);
    return this.http.post(BASE_URL + 'signin/owneruser', {'username': data.username, 'password': data.password}, {})
      .map(response => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        return <User>response;
      });
  }


  loginAdmin(data: { username: string, password: string }): any {
    return this.http.post(BASE_URL + 'signin/admin', {'username': data.username, 'password': data.password}, {})
      .map(response => {
        console.log(response);
        localStorage.setItem('admin', JSON.stringify(response));
        return <User>response;
      });
  }

  logout() {
    localStorage.clear();
  }

  hasLoginTokenUser(): boolean {
    if (!!JSON.parse(localStorage.getItem('user'))) {
      return !!JSON.parse(localStorage.getItem('user')).token;
    }
    return false;
  }

  hasLoginTokenAdmin(): boolean {
    if (!!JSON.parse(localStorage.getItem('admin'))) {
      return !!JSON.parse(localStorage.getItem('admin')).token;
    }
    return false;
  }

  addMember(data) : Observable<Member>{
    const loader = this.loadingCtrl.create({
      content: 'Adding Member...'
    });
    loader.present();
    return this.http.post(BASE_URL+ 'members',
      {"name":data.name,"email":data.email,"phone":data.mobile,
        "gender":data.gender,"is_notification_member":data.is_notification_member},
      { headers:this.getHeaders(),params:{}}).map(res => {
      loader.dismiss();
      return <Member>res;
    })
  }

  loadMembers() : Observable<Member[]>{
    const loader = this.loadingCtrl.create({
      content: 'Fetching Member List...'
    });
    loader.present();
    return this.http.get(BASE_URL+'members',{headers: this.getHeaders()}).map((res) => {
      loader.dismiss();
      return <Member[]>res;
    });
  }

  private getHeaders(): { [header: string]: string | string[] } {
    const token = JSON.parse(localStorage.getItem('user')).token;
    console.log('Token Is' + token);
    return token ? {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'} : {};
  }



}
