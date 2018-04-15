import {Action} from "../actions/index";
import {MEMBER_ADD_ACTION, MEMBER_LOAD_ACTION, MEMBER_LOADED_ACTION} from "../actions/member";
import {Member} from "../models/member";
import {RootState} from "./index";

export interface MemberState {
  member: Member[];
  loaded: boolean;
  loading: boolean;
}

export const initialMemberState: MemberState = {
  member: [],
  loaded: false,
  loading: false
};

export function memberReducer(state: MemberState = initialMemberState, action: Action) {
  switch (action.type) {
    case MEMBER_ADD_ACTION :
      return {
        ...state,
        member: [...state.member, action.payload]
      }
    case MEMBER_LOAD_ACTION:
      return {
        ...state,
        loaded:false,
        loading:true,
      }
    case MEMBER_LOADED_ACTION:
      return {
        ...state,
        loaded: true,
        loading: false,
        member:[... action.payload]
      }
    default:
      return state;
  }

}
export function getMembers(state: RootState) {
  return state.memberState.member;
}
export function membersLoaded(state: RootState) {
  return state.memberState.loaded;
}
export function membersLoading(state: RootState) {
  return state.memberState.loading;
}
