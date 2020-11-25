import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {v4 as uuid} from 'uuid';
import { Order } from '../shared/interfaces/order';
import { OrderService } from '../shared/services/order.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  error=false;
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
  removable = true;
  orderProducts: string[];

  formGroup: FormGroup;


  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.orderProducts=[];
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['',Validators.required],
      table:['',Validators.required]
    })
  }

  addToOrder(product){
    this.orderProducts.push(product);
  }

  removeFromOrder(i){
    this.orderProducts.splice(i,1);
  }

  submit(){
    if(this.formGroup.invalid)
      return this.error =true;

    const {name,table}= this.formGroup.value;

    const order: Order = {
      id:      uuid(),
      name,
      table,
      /*     this.form.get('name').value,
      table:   this.form.get('table').value, */
      products:this.orderProducts
    }

    console.log(order);

    this.orderService.create(order).subscribe(e => {
      this.formGroup.reset();
      this.orderProducts=[];
      this.sendSuccess=true;
      setTimeout(_=>this.sendSuccess=false,2000);
    });

  }

}
