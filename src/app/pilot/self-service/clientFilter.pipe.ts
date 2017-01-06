import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../../common/order";

@Pipe({ name: 'clientFilter', pure: false })
export class ClientFilter implements PipeTransform {
  transform(orders: Array<Order>, filter: string): Array<Order> {
    if (!filter) {
      return orders;
    } else {
      return orders.filter(order => order.client.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
  }
}
