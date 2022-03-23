import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  constructor(private _productService: ProductService) {}
  cartData: Cart[] = [];
  ngOnInit() {
    this._productService.subject$.subscribe((data) => {
      this.cartData = data;
    });
  }

  removeItem(id: number) {
    this._productService.removeFromCart(id);
  }

}
