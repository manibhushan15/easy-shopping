import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _productService: ProductService) {}
  cartData: Cart[] = [];
  totalItemInCart: number = 0;

  ngOnInit(): void {
    this._productService.subject$.subscribe((data) => {
      this.cartData = data;
      this.totalItemInCart = this.cartData.reduce((sum, current) => sum + current.quantity, 0);
    });
  }

}
