import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductEffects {

  constructor(private actions$: Actions,
    private productService: ProductService) { }

  @Effect()
  loadProducts$ = this.actions$.pipe(
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

}
