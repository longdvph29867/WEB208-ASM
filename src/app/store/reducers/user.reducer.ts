import { createReducer, on } from "@ngrx/store";
import { setUserInfo } from "../actions/user.actions";
import { UserInfo } from "../../types/user";

export interface UserState {
  userInfo: UserInfo | null;
}

export const initialState: UserState = {
  userInfo: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUserInfo, (state, { userInfo }) => ({ ...state, userInfo }))
)
