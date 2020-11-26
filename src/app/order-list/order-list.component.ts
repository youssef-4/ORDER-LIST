import { Observable } from 'rxjs';
import { Order } from './../shared/interfaces/order';
import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../shared/services/order.service';
import { FireService } from '../shared/services/fire.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  lista: Observable<Order[]>;
  orderList:Order[];
  constructor(private fireService:FireService) { }

  ngOnInit(): void {

   this.lista = this.fireService.read$();
/*     this.orderService.read$().subscribe(
      data => this.orderList=data.filter(e => e.name == localStorage.getItem('name')));
 */

  }

}
