import {ActionReducerMap} from "@ngrx/store";
import {memberReducer, MemberState} from "./member";

export interface RootState {
  memberState: MemberState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  memberState: memberReducer
}
