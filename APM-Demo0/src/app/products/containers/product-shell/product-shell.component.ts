import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../../product';
import { ProductService } from '../../product.service';
import { Store, select } from '@ngrx/store';


import * as fromProduct from '../../state/product.reducer';
import * as ProductActions from '../../state/product.actions';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  /*errorMessage: string;
  displayCode: boolean;
  products: Product[];
  showSpinner: boolean;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  */

  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.AppState>) {
  }

  ngOnInit(): void {

    // dispatch the call to load data, which will be handled by the effects.
    this.store.dispatch(new ProductActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }
  /**
   * Fires when a user clicks the checkbox.
   * @param value the value of the checkbox
   */
  checkChanged(value: boolean): void {
    this.store.dispatch(new ProductActions.ToggleProductCode(value));
  }

  newProduct(): void {
    //this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new ProductActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new ProductActions.SetCurrentProduct(product.id));
  }
}
