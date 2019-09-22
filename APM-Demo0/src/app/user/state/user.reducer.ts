import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from '../../state/app.state';
import { UserActions, UserActionTypes } from "./user.actions";


export interface AppState extends fromRoot.AppState {
    user: UserState
}

export interface UserState {
    maskUserName: boolean
}

const initialState: UserState = {
    maskUserName: false
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export function reducer(state = initialState, action: UserActions): UserState {

    switch (action.type) {

        case UserActionTypes.MaskUserName:
            return {
                ...state,
                maskUserName: action.payload,
            }
        default:
            return state;
    }
}