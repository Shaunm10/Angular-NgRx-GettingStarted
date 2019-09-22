import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from '../../state/app.state';

export interface AppState extends fromRoot.AppState {
    user: UserState
}

export interface UserState {
    maskUserName: boolean
}

const initialState: UserState = {
    maskUserName: false;
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export function reducer(state = initialState, action): UserState {
    console.log('old state:', state);
    console.log('action', action);
    switch (action.type) {
        case 'TOGGLE_MASK_USER_NAME':
            return {
                ...state,
                maskUserName: action.payload,
            }
        default:
            return state;

    }
}