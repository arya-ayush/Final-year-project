import {Action} from "../actions/index";
import {MEMBER_ADD_ACTION, MEMBER_LOAD_ACTION} from "../actions/member";
import {Member} from "../models/member";

export interface MemberState {
  member: Member[];
}

export const initialMemberState: MemberState = {
  member: [],
};

export function memberReducer(state: MemberState = initialMemberState, action: Action) {
  switch (action.type) {
    case MEMBER_ADD_ACTION :
      return {
        ...state,
        user: [...state.member, action.payload]
      }
    case MEMBER_LOAD_ACTION:
      return;
    default:
      return state;
  }

}
