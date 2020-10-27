import { Injectable } from "@angular/core";
import { CartItem } from "app/restaurant-details/shopping-cart/carts-item.module";
import { ShoppingCartService } from "app/restaurant-details/shopping-cart/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MEAT_API } from "app/app.api";
import { Order } from "./order.model";
import { LoginService } from "app/security/login/login.service";


@Injectable()
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient,
  ) { }

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

  itemsValue(): number {
    return this.cartService.total();
  }

  checkOrder(order: Order): Observable<string> {
    return this.http.post<Order>(`${MEAT_API}/orders`, order)
      .map(order => order.id)
  }

  clear() {
    this.cartService.clear();
  }

}
