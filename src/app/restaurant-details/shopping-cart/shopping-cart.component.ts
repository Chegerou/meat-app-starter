import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartsService: ShoppingCartService) { }

  ngOnInit() {
  }


  items():any[]{
    return this.shoppingCartsService.items;
  }

  total(): number{
    return this.shoppingCartsService.total();
  }

  clear(){
    this.shoppingCartsService.clear();
  }

  removeItem(item: any){
    this.shoppingCartsService.removeItem(item);
  }

  addItem(item: any){
    this.shoppingCartsService.addItem(item);
  }


}
