import { Action } from "@ngrx/store";

/**
 * PURPOSE: contains the actions for the 'user' ngRx
 */

export enum UserActionTypes {
    MaskUserName = "[User] Toggle Masked UserName"
}

export class ToggleMaskUserName implements Action {
    readonly type = UserActionTypes.MaskUserName;
    constructor(public payload: boolean) { }
}

export type UserActions = ToggleMaskUserName;