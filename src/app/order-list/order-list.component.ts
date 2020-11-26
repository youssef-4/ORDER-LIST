import { Order } from './../shared/interfaces/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList:Order[];
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {

    this.orderService.read$().subscribe(
      data => this.orderList=data.filter(e => e.name == localStorage.getItem('name')));


  }

}
