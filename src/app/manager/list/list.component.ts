import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../../services/manager.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {Order} from "../../common/order";
import {OrderService} from "../../services/order.service";
import {MODAL_DIRECTIVES} from 'ng2-bs3-modal/ng2-bs3-modal';
import {ClipboardDirective} from 'angular2-clipboard';


@Component({
  moduleId: module.id,
  selector: 'list',
  templateUrl: 'list.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective],
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

  /** COPY DETAILS **/

  public getRecipient(order:Order):string {
    return order.client;
  }

  public getTitle(status:string) {
    if (status === 'confirmed') {
      return "Order Confirmed";
    } else if (status === 'rejected') {
      return "Order Rejected";
    }
  }

  public generateMail(status:string, order:Order):string {
    let result = "Hi " + order.client + "!<br><br>";

    if (status === 'confirmed') {
      result += "Thank you for your order (" + order.link + "). With a 13% delivery fee to O1Y it will cost " + new NumberGrouping().transform(order.setPrice) + ".00 ISK. Shipping will start soon!";
    } else if (status === 'rejected') {
      result += "We are sad to inform you that your order cannot be accepted. This is due to overly high shipping costs. Maybe you want to focus on importing modules and building ships locally?";
    } else if (status === 'contracted') {
      result += "Your order (" + order.link + ") has been contracted to you and costs " + new NumberGrouping().transform(order.setPrice) + ".00 ISK. Let me know when you need more!";
    }

    result += "<br><br>Cheers, Rihan";

    return result;
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
