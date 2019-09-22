import { Product } from "../product";

/**
 * This is to not break our lazy-loading pattern.
 * The AppModule will always be loaded, but this product module may not.
 */
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActionTypes, ProductActions } from "./product.actions";

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

/**
 * private const, to only be used by this code file.
 */
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

export function reducer(state = initialState, action: ProductActions): ProductState {
    switch (action.type) {

        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            }

        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProduct: { ...action.payload }
            };
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProduct: null
            }

        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProduct: {
                    id: 0,
                    productName: '',
                    productCode: 'New',
                    description: '',
                    starRating: 0
                }
            }
        default:
            return state;
    }

}