import { createAction, props } from "@ngrx/store";
import { UserInfo } from "../../types/user";

export const setUserInfo = createAction('[User] Set User Info',  props<{ userInfo: UserInfo }>())
