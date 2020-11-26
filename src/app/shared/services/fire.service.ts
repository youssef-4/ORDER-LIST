import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {


  constructor(private afs: AngularFirestore) { }

  read$():Observable<Order[]>{
    return this.afs.collection<Order>('orders').valueChanges();
  }

  create(order:Order): Promise<void> {
    return this.afs.collection<Order>('orders').doc(order.id).set(order);
  }
}
