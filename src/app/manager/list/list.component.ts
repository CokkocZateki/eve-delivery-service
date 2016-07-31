import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../../services/manager.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {Order} from "../../common/order";
import {OrderService} from "../../services/order.service";
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'list',
  templateUrl: 'list.component.html',
  directives: [MODAL_DIRECTIVES],
  providers: [ManagerService, OrderService],
  pipes: [NumberGrouping]
})
export class ListComponent implements OnInit {

  public data:Array<any> = undefined;
  public modalOrder:Order;

  constructor(private service:ManagerService, private orderService:OrderService) {
  }

  ngOnInit() {
    this.service.list().subscribe(
      data => {
        this.data = data.json();
      },
      err => {
        console.log(err);
      }
    );
  }

  /** DIALOGS **/

  public showDialog(order:Order, dialog:any) {
    dialog.open();
    this.modalOrder = order;
  }

  /** PRICING **/

  public loadAndSetPrice(order:Order) {
    this.orderService.quote(order.link).subscribe(
      data => {
        let body = data.json();
        order.setPrice = Number(body.price);
        this.onPriceChange(order.id, order.setPrice + "");
        this.checkShippingCosts(order);
      },
      err => {
        console.log(err);
      }
    );
  }

  public onPriceChange(orderId:string, price:string) {

    price = price.replace("ISK", "").replace(" ", "").replace(",", "");

    this.service.updatePrice(orderId, price).subscribe(
      data => {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].id === orderId) {
            this.data[i].price = price;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  private checkShippingCosts(order:Order) {
    this.orderService.shippingPrice(order.link).subscribe(
      data => {
        let body = data.json();
        let shippingPrice = Number(body.price);

        if (shippingPrice > order.setPrice) {
          alert("Order for " + order.client + " has a negative margin of " + (order.setPrice - shippingPrice) / 1000000 + " mil ISK.");
        }

        this.service.updateShippingPrice(order.id, "" + shippingPrice).subscribe(
          data => {
          },
          err => {
            alert("Could not set shipping price. See logs.");
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

}
