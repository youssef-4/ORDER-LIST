import { switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _url:string =  environment.URL;
  private refresh$ = new BehaviorSubject(null);

  constructor(private http:HttpClient) { }


  read$(): Observable<Order[]>{
//    return this.http.get<Order[]>(`${this._url}/orders`);

    return this.refresh$.pipe(switchMap(()=>
            this.http.get<Order[]>(`${this._url}/orders`)));
  }

  create(order: Order){

    return this.http.post<Order>(`${this._url}/orders`,order)
    .subscribe(()=>this.refresh$.next(null));

  }

}
