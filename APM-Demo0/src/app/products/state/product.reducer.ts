import { Product } from "../product";

/**
 * This is to not break our lazy-loading pattern.
 * The AppModule will always be loaded, but this product module may not.
 */
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActionTypes, ProductActions } from "./product.actions";
import { st } from "@angular/core/src/render3";

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
    currentProductId: number | null;
    products: Product[],
    error: string
}


const initialState: ProductState = {
    showProductCode: false,
    currentProductId: null,
    products: [],
    error: ''
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
export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

/**
 * The current selected product
 */
export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    //state => state.products.find(p => p.id === state.currentProductId)
    (state, currentProductId) => {
        if (currentProductId === 0) {
            // we are assuming this is a new product at this point.
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId ? state.products.find(p => p.id === state.currentProductId) : null;
        }
    }
);

/**
 * All the products
 */
export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

/**
 * Any error that occurred when trying to get the Products.
 */
export const getError = createSelector(
    getProductFeatureState,
    state => state.error
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
                currentProductId: action.payload
            };
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null
            }

        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0
            }

        case ProductActionTypes.LoadSuccess:
            return {
                ...state,
                products: action.payload,
                error: ''
            }

        case ProductActionTypes.LoadFail: {
            return {
                ...state,
                products: [],
                error: action.payload
            };
        }

        // occurs when we successfully changed updated a product
        case ProductActionTypes.UpdateProductSuccess: {
            // we need to create a new array and NOT mutate the existing one.
            const updatedProducts = state.products.map(
                item => action.payload.id === item.id ? action.payload : item
            );

            return {
                ...state,
                products: updatedProducts,
                currentProductId: action.payload.id,
                error: ''
            };
        }

        // occurs when the update fails.
        case ProductActionTypes.UpdateProductFail:
            return {
                ...state,
                error: action.payload
            };

        case ProductActionTypes.DeleteProductSuccess:
            const indexOfDeletedItem = state.products.findIndex(p => p.id === action.payload);

            // copy the array
            const updatedProducts = state.products.slice(0);

            // remove the item
            updatedProducts.splice(indexOfDeletedItem, 1);

            return {
                ...state,
                products: updatedProducts,
                currentProductId: null,
                error: ''
            }

        case ProductActionTypes.DeleteProductFail:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }

}