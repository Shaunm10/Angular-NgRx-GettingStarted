import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class ProductEffects {

  constructor(private actions$: Actions,
    private productService: ProductService) { }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    // listen for only this action
    ofType(productActions.ProductActionTypes.Load),
    // when it's called call the getProducts on the Products Service (network request)
    mergeMap((action: productActions.Load) => this.productService.getProducts()
      .pipe(
        // if successful, call another action, passing the data. 
        map((products: Product[]) => (new productActions.LoadSuccess(products))),
        catchError(err => of(new productActions.LoadFail(err)))
      ))
  )

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(

    // watch for just the UpdateProduct action
    ofType(productActions.ProductActionTypes.UpdateProduct),

    // get the product object from the action's payload.
    map((action: productActions.UpdateProduct) => action.payload),

    // passing that product, and the productService observable
    // because we don't want nested observables, the mergeMap will 'flatten' the observables.
    mergeMap((product: Product) =>

      // make the network call
      this.productService.updateProduct(product).pipe(

        // the call was successful, so dispatch the success operation
        map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),

        // or call error'ed, so dispatch the error operation.
        catchError(err => of(new productActions.UpdateProductFail(err)))
      )
    )
  )

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(

    // watch for just the DeleteProduct action
    ofType(productActions.ProductActionTypes.DeleteProduct),

    map((action: productActions.DeleteProduct) => action.payload),

    mergeMap((productId: number) =>

      // make the network call
      this.productService.deleteProduct(productId).pipe(
        map(() => (new productActions.DeleteProductSuccess(productId))),

        // catch the error
        catchError(err => of(new productActions.DeleteProductFail(err)))
      )
    )
  )
}
