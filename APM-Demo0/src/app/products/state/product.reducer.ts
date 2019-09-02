export function reducer(state, action) {
    switch (action.type) {

        case 'TOGGLE_PRODUCT_CODE':
            console.log('existing state:', state);
            console.log('payload: ', action.payload);
            return {
                ...state,
                showProductCode: action.payload
            }
        default:
            return state;
    }

}