import {Service} from "../services/service";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {RootState} from "../reducers";
import {User} from "../models/user";
import {Observable} from "rxjs/Observable";
import {Member} from "../models/member";
import {
  MemberAddAction, MemberDeleteAction, MembersLoadAction, MembersLoadedAction,
  MemberUpdateAction
} from "../actions/member";
import {getMembers, membersLoaded, membersLoading} from "../reducers/member";
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { Block, Visitor } from "../models/visitor";


@Injectable()
export class Repository {
  constructor(private service: Service, private store: Store<RootState>) {
  }

  logout(deviceId): Observable<any>{
    return this.service.logout(deviceId).map( res => {
      return res
    });
  }

  adminLogout() {
    this.service.adminLogout();
  }

  hasLoginTokenUser(): boolean {
    return this.service.hasLoginTokenUser();
  }

  hasLoginTokenAdmin(): boolean {
    return this.service.hasLoginTokenAdmin();
  }

  loginUser(data: { username: string, password: string }): Observable<User> {
    return this.service.loginUser(data).map((res: User) => {
      return res;
    });
  }

  loginAdmin(data: { username: string, password: string }): Observable<User> {
    return this.service.loginAdmin(data).map((res: User) => {
      return res;
    });
  }

  addMember(data): Observable<Member> {
    return this.service.addMember(data)
      .map((res: Member) => {
        this.store.dispatch(new MemberAddAction(res));
        return res;
      });
  }

  addVisitor(data): Observable<Visitor> {
    return this.service.addVisitor(data)
      .map((res: Visitor) => {
        return res;
      });
  }

  deleteMember(id: number): Observable<Member> {
    return this.service.deleteMember(id).map((res: Member) => {
      this.store.dispatch(new MemberDeleteAction(id));
      return res;
    });
  }

  updateMember(memberId: number, data): Observable<Member> {
    return this.service.updateMember(memberId, data).map((res: Member) => {
      this.store.dispatch(new MemberUpdateAction(res));
      return res;
    });
  }
  getMembers(): [Observable<Member[]>, Observable<boolean>] {
    const loading$ = this.store.select(membersLoading);
    const loaded$ = this.store.select(membersLoaded);
    const members$ = this.store.select(getMembers);

    loading$.combineLatest(loaded$, (loading, loaded) => loading || loaded)
      .take(1).filter(v => !v).subscribe(() => {
      this.store.dispatch(new MembersLoadAction());
      this.service.loadMembers().subscribe(members => {
        this.store.dispatch(new MembersLoadedAction(members));
      });
    });

    return [members$, loading$];
  }

  getVisitor(date): Observable<Visitor[]>{
    return this.service.getVisitor(date).map((res) => {
      return <Visitor[]>res;
    });
  }

  getAllVisitor(date): Observable<Visitor[]>{
    return this.service.getAllVisitor(date).map((res) => {
      return <Visitor[]>res;
    });
  }

  getNotificationMember(): Observable<Member[]>{
    return this.service.getNotificationMember().map((res) => {
      return <Member[]>res;
    })
  }

  getBlockList(): Observable<Block>{
    return this.service.getBlockList().map((res) => {
      return <Block>res;
    })
  }

  addOwner(data): Observable<Member> {
    return this.service.addOwner(data)
      .map((res: Member) => {
        return res;
      });
  }

  sendOtp(mobileNumber): Observable<any> {
    return this.service.sendOtp(mobileNumber).map(res => {
      return res;
    });
  }
  verifyOtp(otp,mobileNumber): Observable<any> {
    return this.service.verifyOtp(otp,mobileNumber).map( res => {
      return res;
    });
  }
  sendSms(mobileNumber,message): Observable<any> {
    return this.service.sendSms(mobileNumber,message).map(res =>{
      return res;
    });
  }

  addOneSignalId(deviceId): Observable<any> {
    return this.service.addOneSignalId(deviceId).map(res => {
      return res;
    })
  }

  registerComplain(data:any) : Observable<any> {
    return this.service.registerComplain(data);
  }

  forgotPassword(data: any) : Observable<any> {
    return this.service.forgotPassword(data);
  }

  changePassword(data: any) : Observable<any> {
    return this.service.changePassword(data);
  }

  getComplaints() : Observable<any> {
    return this.service.getComplaints();
  }
}
