import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../model/cart.model';
import { map } from 'rxjs/operators'
import data from '../../assets/data/product.json'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = []
  cartData: Cart[] = [];
  subject$ = new Subject<Cart[]>();
  constructor(private httpClient: HttpClient) {
    this.products = data.productList
   }

  getProductList(): Product[] {
    return this.products;
   }
  addToCart(product: Cart, productIndex: number) {
    this.products[productIndex].isAddedToCart = true;
    this.products[productIndex].quantity--;
    const index = this.cartData.findIndex((item) => {
      return item.id === product.id;
    });
    if (index !== -1) {
      this.cartData[index].quantity = this.cartData[index].quantity + 1;
    } else {
      this.cartData.push(product);
    }
    this.subject$.next(this.cartData);
  }

  removeFromCart(id: number) {
    const index = this.cartData.findIndex((item) => item.id === id);
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.cartData[index].quantity = this.cartData[index].quantity - 1;
      this.products[productIndex].quantity++;
      if (this.cartData[index].quantity === 0) {
        this.products[productIndex].isAddedToCart = false;
        this.cartData.splice(index, 1);
      }
    }
    this.subject$.next(this.cartData);
  }
}
