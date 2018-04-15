import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {LoadingController} from "ionic-angular";
import {User} from "../models/user";

const BASE_URL = 'http://vallabh-final.herokuapp.com/';

@Injectable()
export class Service {
  constructor(private http: HttpClient, private loadingCtrl: LoadingController) {
  }

  loginUser(data: { username: string, password: string }): any {
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

  addMember(data) {
    // console.log('Data sent');
    // console.log(data);
    // const loader = this.loadingCtrl.create({
    //   content: 'Adding Member...'
    // });
    // loader.present();
    // return this.http.post(BASE_URL+ 'members', {data},{ headers:this.getHeaders(),params:{}}).map(res => {
    //   loader.dismiss();
    //   console.log(res);
    //   //return <Member>res;
    // });
  }

  private getHeaders(): { [header: string]: string | string[] } {
    const token = JSON.parse(localStorage.getItem('user')).token;
    console.log('Token Is' + token);
    return token ? {Authorization: 'Token ' + token, 'Content-Type': 'application/json'} : {};
  }



}
