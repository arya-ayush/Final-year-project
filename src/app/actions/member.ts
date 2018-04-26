import {Action} from "./index";
import {Member} from "../models/member";

export const MEMBER_LOAD_ACTION = '[Member] Load Action';
export const MEMBER_ADD_ACTION = '[Member] Add Action';
export const MEMBER_DELETE_ACTION = '[Member] Delete Action';
export const MEMBER_UPDATE_ACTION = '[Member] Update Action';
export const MEMBER_LOADED_ACTION = '[Member] Loaded Action';

export class MembersLoadAction implements Action {
  readonly type = MEMBER_LOAD_ACTION;
}

export class MembersLoadedAction implements Action {
  readonly type = MEMBER_LOADED_ACTION;
  constructor(public payload: Member[]){
  }
}

export class MemberAddAction implements Action{
  readonly type = MEMBER_ADD_ACTION;
  constructor(public payload: Member){
  }
}

export class MemberDeleteAction implements Action{
  readonly type = MEMBER_DELETE_ACTION;
  constructor(public payload: number){
  }
}

export class MemberUpdateAction implements Action{
  readonly type = MEMBER_UPDATE_ACTION;
  constructor(public payload: Member){
  }
}
