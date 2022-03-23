import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import * as product  from '../../../assets/data/product.json'
import { Cart } from '../../model/cart.model';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  cartData: Cart[] = [];
  subject$ = new Subject<Cart[]>();
  constructor(
    private _productService: ProductService,
  ) {}

  ngOnInit() {
    this.products = this._productService.getProductList();
    console.log("products",this.products)
  }

  addToCart(product: Product, index: number) {
    let cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };
    this._productService.addToCart(cartItem, index);
  }
}
