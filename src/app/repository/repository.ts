import {Service} from "../services/service";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {RootState} from "../reducers";
import {User} from "../models/user";
import {Observable} from "rxjs/Observable";


@Injectable()
export class Repository {
  constructor(private service: Service, private store: Store<RootState>) {
  }

  logout(){
    this.service.logout();
  }

  hasLoginTokenUser(): boolean {
    return this.service.hasLoginTokenUser();
  }

  hasLoginTokenAdmin(): boolean {
    return this.service.hasLoginTokenAdmin();
  }

  loginUser(data: { username: string, password: string }): Observable<User> {
    return this.service.loginUser(data).map((res:User) =>{
      return res;
    });
  }

  loginAdmin(data: { username: string, password: string }): Observable<User> {
    return this.service.loginAdmin(data).map((res:User) =>{
      return res;
    });
  }

  addMember(data) {
    return this.service.addMember(data)
    //.map((res: Member) => {
    //this.store.dispatch(new MemberAddAction(res));
    //return res;
    //});
  }
}
