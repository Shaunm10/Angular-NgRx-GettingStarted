export interface UserState {
    maskUserName: boolean
}

export function reducer(state: UserState, action): UserState {
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