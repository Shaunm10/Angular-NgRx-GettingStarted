import { Product } from "../product";

/**
 * This is to not break our lazy-loading pattern.
 * The AppModule will always be loaded, but this product module may not.
 */
import * as fromRoot from '../../state/app.state';

/**
 * Extending the AppState to include what this module provides.
 */
export interface AppState extends fromRoot.AppState {
    products: ProductState
}

/**
 * The definition of our ProductState
 * All the properties that it may have.
 */
export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[]
}


const initialState: ProductState = {
    showProductCode: false,
    currentProduct: null,
    products: []

}

export function reducer(state = initialState, action): ProductState {
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