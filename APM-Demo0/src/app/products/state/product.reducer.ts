import { Product } from "../product";

/**
 * This is to not break our lazy-loading pattern.
 * The AppModule will always be loaded, but this product module may not.
 */
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";

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

const getProductFeatureState = createFeatureSelector<ProductState>('products')

/**
 * Should the product code be shown?
 */
export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

/**
 * The current selected product
 */
export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

/**
 * All the products
 */
export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

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