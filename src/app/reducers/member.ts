import {Action} from "../actions/index";
import {
  MEMBER_ADD_ACTION, MEMBER_DELETE_ACTION, MEMBER_LOAD_ACTION, MEMBER_LOADED_ACTION,
  MEMBER_UPDATE_ACTION
} from "../actions/member";
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
    case MEMBER_ADD_ACTION :{
      return {...state, member: [...state.member, action.payload]};
    }

    case MEMBER_LOAD_ACTION: {
      return {...state, loaded: false, loading: true};
    }

    case MEMBER_LOADED_ACTION: {
      return {...state, loaded: true, loading: false, member: [...action.payload]};
    }

    case MEMBER_DELETE_ACTION: {
      const memberDelete = action.payload;
      const restOfMember = state.member.filter(member => member.id  !== memberDelete);
      return {...state, member: restOfMember, loading: false, loaded: true};
    }

    case MEMBER_UPDATE_ACTION: {
      const memberUpdate = action.payload;
      const restOfMember = state.member.filter(member => member.id  !== memberUpdate.id);
      return {...state, member: [...restOfMember,action.payload], loading: false, loaded: true};
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
