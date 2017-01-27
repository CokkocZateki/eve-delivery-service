import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "./order";

@Pipe({ name: 'orderDestinationFilter', pure: false })
export class OrderDestinationFilter implements PipeTransform {
  transform(orders: Array<Order>, filter: string): Array<Order> {
    if (!filter || filter == 'All destinations') {
      return orders;
    } else {
      return orders.filter(order => order.destination.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
  }
}
