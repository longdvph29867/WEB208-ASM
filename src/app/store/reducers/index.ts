import { isDevMode } from "@angular/core";
import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { userReducer } from "./user.reducer";
export interface State {}

export const reducers: ActionReducerMap<State> = {
  userInfo: userReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
