import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {User} from "../models/user";
import {Observable} from "rxjs/Observable";
import {Member} from "../models/member";
import {Visitor} from "../models/visitor";

const BASE_URL = 'http://vallabh-final.herokuapp.com/';

@Injectable()
export class Service {
  constructor(private http: HttpClient) {
  }

  private getHeaders(): { [header: string]: string | string[] } {
    const token = JSON.parse(localStorage.getItem('user')).token;
    return token ? {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'} : {};
  }

  private getAdminHeaders(): { [header: string]: string | string[] } {
    const token = JSON.parse(localStorage.getItem('admin')).token;
    return token ? {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'} : {};
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

  loginUser(data: { username: string, password: string }): any {
    return this.http.post(BASE_URL + 'signin/owneruser', {'username': data.username, 'password': data.password}, {})
      .map(response => {
        localStorage.setItem('user', JSON.stringify(response));
        return <User>response;
      });
  }

  loginAdmin(data: { username: string, password: string }): any {
    return this.http.post(BASE_URL + 'signin/admin', {'username': data.username, 'password': data.password}, {})
      .map(response => {
        localStorage.setItem('admin', JSON.stringify(response));
        return <User>response;
      });
  }

  logout() {
    localStorage.clear();
  }

  addMember(data): Observable<Member> {
    return this.http.post(BASE_URL + 'members',
      {
        "name": data.name, "email": data.email, "phone": data.mobile,
        "gender": data.gender, "is_notification_member": data.is_notification_member
      },
      {headers: this.getHeaders(), params: {}}).map(res => {
      return <Member>res;
    })
  }

  loadMembers(): Observable<Member[]> {
    return this.http.get(BASE_URL + 'members', {headers: this.getHeaders()}).map((res) => {
      return <Member[]>res;
    });
  }

  deleteMember(memberId: number): Observable<Member> {
    return this.http.delete(BASE_URL + `member/${memberId}`, {headers: this.getHeaders()}).map(res => {
      return <Member>res;
    });
  }

  getVisitor(date): Observable<Visitor[]> {
    return this.http.get(BASE_URL + `flat/visitors?date=${date}`, {headers: this.getHeaders()}).map((res) => {
      return <Visitor[]> res;
    });
  }

  getAllVisitor(date): Observable<Visitor[]> {
    return this.http.get(BASE_URL + `society/visitors?date=${date}`, {headers: this.getAdminHeaders()}).map((res) => {
      return <Visitor[]> res;
    });
  }

  updateMember(memberId: number, data): Observable<Member> {
    return this.http.put(BASE_URL + `member/${memberId}`,
      {
        "name": data.name, "email": data.email, "phone": data.mobile,
        "gender": data.gender, "is_notification_member": data.is_notification_member
      },
      {headers: this.getHeaders(), params: {}}).map(res => {
      return <Member>res;
    })
  }

  getNotificationMember(): Observable<Member[]> {
    return this.http.get(BASE_URL + 'members?notification=YES', {headers: this.getHeaders()}).map((res) => {
      return <Member[]>res;
    });
  }

  addOwner(data): Observable<Member> {
    return this.http.post(BASE_URL + 'signup/owneruser',
      {
        "username": data.name,
        "email": data.email,
        "phone": data.mobile,
        "password": data.password,
        "block": data.block,
        "flat_num": data.flatNumber,
        "gender": data.gender
      },
      {headers: this.getAdminHeaders(), params: {}}).map(res => {
      return <Member>res;
    })
  }

  addVisitor(data): Observable<Visitor> {
    return this.http.post(BASE_URL + 'society/visitors',
      {
        "name": data.name, "address": data.address, "phone": data.mobile,
        "block": data.block, "purpose": data.purpose,"flat_num":data.flatNumber
      },
      {headers: this.getAdminHeaders(), params: {}}).map(res => {
      return <Visitor>res;
    })
  }
}
