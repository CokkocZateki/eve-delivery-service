import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "./order";

@Pipe({ name: 'orderClientFilter', pure: false })
export class OrderClientFilter implements PipeTransform {
  transform(orders: Array<Order>, filter: string): Array<Order> {
    if (!filter) {
      return orders;
    } else {
      return orders.filter(order => order.client.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
  }
}
