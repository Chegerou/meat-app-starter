import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'app/restaurant-details/shopping-cart/carts-item.module';
import { RadioOption } from 'app/shared/radio/radio-option.module';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;

  delivery: number = 8;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ;
  numberPattern = /^[0-9]*$/;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Catão de Débito', value: 'DEB' },
    { label: 'Catão de Refeição', value: 'REF' }
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern) ]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      adress: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required ,Validators.pattern(this.numberPattern)]),
      optionalAdress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required]),
    }, {validator: OrderComponent.equalsTo});
  }

  static equalsTo(group: AbstractControl): {[key : string] : boolean} {

    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if(!email || !emailConfirmation){
      return undefined;
    }

    if(email.value != emailConfirmation.value){
      return {emailsNotMatch: true}
    }

    return undefined;
  }

  cartItems() {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item:CartItem){
    this.orderService.remove(item);
  }


  itemsValue(): number{
    return this.orderService.itemsValue();
  }

  checkOrder(order: Order){
    order.orderItems =  this.cartItems()
    .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order)
    .subscribe((orderId: Order) => {
      this.router.navigate(['/order-summary']);
      console.log(`Compra concluída: ${orderId}`);
      this.orderService.clear();
    });
  }




}
