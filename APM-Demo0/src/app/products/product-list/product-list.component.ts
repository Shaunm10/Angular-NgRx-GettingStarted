import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';


import * as fromProduct from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;


  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.AppState>) {

  }

  ngOnInit(): void {

    /*this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );*/
    //TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    //this.store.pipe()
    // TODO: Unsubscribe to this.
    this.store.pipe(select(fromProduct.getShowProductCode))
      .subscribe(showProductCode => {
        this.displayCode = showProductCode;
      });
  }

  ngOnDestroy(): void {

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
    this.store.dispatch(new ProductActions.SetCurrentProduct(product));
  }

}
