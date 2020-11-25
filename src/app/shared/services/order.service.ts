import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _url:string =  environment.URL;


  constructor(private http:HttpClient) { }

  create(order: Order){

    return this.http.post<Order>(`${this._url}/orders`,order);

  }
}
