import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {v4 as uuid} from 'uuid';
import { Order } from '../shared/interfaces/order';
import { OrderService } from '../shared/services/order.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products = [
    "Americano",
    "Flat White",
    "Cappuccino",
    "Latte",
    "Espresso",
    "Machiato",
    "Mocha",
    "Hot Chocolate",
    "Tea"
  ];

  sendSuccess =false;
  orderProducts: string[];

  formGroup: FormGroup;


  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.orderProducts=[];
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name:'',
      table:'',
    })
  }

  addToOrder(product){
    this.orderProducts.push(product);
  }

  removeFromOrder(i){
    this.orderProducts.splice(i,1);
  }

  submit(form){

    let order: Order = {
      id:      uuid(),
      name:    form.get('name').value,
      table:   form.get('table').value,
      products:this.orderProducts
    }

    this.orderService.create(order).subscribe(e => {
      this.formGroup.reset();
      this.orderProducts=[];
      this.sendSuccess=true;
    });

  }

}
