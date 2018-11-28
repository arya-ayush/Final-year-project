import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {User} from "../models/user";
import {Observable} from "rxjs/Observable";
import {Member} from "../models/member";
import { Block, Visitor } from "../models/visitor";

const BASE_URL = 'http://vallabh-final.herokuapp.com/';
const MSG_BASE_URL = 'http://control.msg91.com/api/';
const SMS_BASE_URL = 'http://api.msg91.com/api/';
const Auth_Key = '162965AXHuE54859533cfb';
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

  private getAdminHeader(): { [header: string]: string | string[] } {
    const token = JSON.parse(localStorage.getItem('admin')).token;
    return token ? {'Authorization': 'Token ' + token} : {};
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
  logout(deviceId) : Observable<any> {
    const userName = JSON.parse(localStorage.getItem('user')).username;
    const societyName = JSON.parse(localStorage.getItem('user')).society_name;
    const block = JSON.parse(localStorage.getItem('user')).block;
    const flatNum = JSON.parse(localStorage.getItem('user')).flat_num;
    return this.http.post(BASE_URL + 'checkout', {
      username: userName ,
      society_name: societyName ,
      flat_num : flatNum ,
      block: block,
      device_id : deviceId
    }, {}).map( res => {
      localStorage.clear();
      return res;
    })
  }
  adminLogout() {
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
      data,
      {headers: this.getAdminHeader()}).map(res => {
      return <Visitor>res;
    })
  }

  getBlockList(): Observable<Block>{
    const society = JSON.parse(localStorage.getItem('admin')).society_name;
    return this.http.get(BASE_URL+`list_block?society_name=${society}`,{headers: this.getAdminHeaders()}).map(
      (res) => {
        return <Block>res;
      }
    )
  }

  sendOtp(mobileNumber): Observable<any>{
    return this.http.post(MSG_BASE_URL+'sendotp.php',{},
      {params:{
          'authkey':Auth_Key,
          'message':'Your OTP is ##OTP##',
          'sender': 'Homantra',
          'mobile':mobileNumber
      }})
      .map(res =>{
        return res;
      });
  }

  verifyOtp(otp,mobileNumber): Observable<any>{
    return this.http.post(MSG_BASE_URL+'verifyRequestOTP.php',{},
      {params:{
          'authkey':Auth_Key,
          'mobile':mobileNumber,
          'otp':otp
      }})
      .map(res => {
        return res;
      });
  }

  sendSms(mobileNumber,message): Observable<any>{
    return this.http.get(SMS_BASE_URL+'sendhttp.php',
      {params:{
          'sender':'Homant',
          'route':'4',
          'mobiles':mobileNumber,
          'authkey':Auth_Key,
          'country':'91',
          'message':message
      }})
      .map(res =>{
        return res;
      });
  }

  addOneSignalId(deviceId): Observable<any> {
    const userName = JSON.parse(localStorage.getItem('user')).username;
    const societyName = JSON.parse(localStorage.getItem('user')).society_name;
    const block = JSON.parse(localStorage.getItem('user')).block;
    const flatNum = JSON.parse(localStorage.getItem('user')).flat_num;
    return this.http.post(BASE_URL+ 'checkin',{
      username: userName ,
      society_name: societyName ,
      flat_num : flatNum ,
      block: block,
      device_id : deviceId
    }, {headers: this.getHeaders()}).map( res => {
      return res;
    });
  }

}
