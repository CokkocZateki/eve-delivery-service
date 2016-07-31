import {Component, OnInit} from '@angular/core';
import {NgIf, CORE_DIRECTIVES} from '@angular/common';
// import {BS_VIEW_PROVIDERS} from "../../../ng2-bootstrap";
import { MODAL_DIRECTIVES } from 'ng2-bootstrap';
import {Http} from "@angular/http";
// import {ClipboardDirective} from '../../../node_modules/angular2-clipboard'
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {Order} from "../../common/order";

@Component({
  selector: 'old-list',
  templateUrl: 'old_list.component.html',
  // viewProviders: [BS_VIEW_PROVIDERS],
  directives: [NgIf, MODAL_DIRECTIVES, /*ClipboardDirective,*/ CORE_DIRECTIVES],
  pipes: [NumberGrouping]
})
export class ListComponent implements OnInit {

  public modalOrder:Order;
  public modalShippingCollateral:number;
  public modalShippingReward:number;
  public clipboardData = "";

  ngOnInit() {
    this.http.get(this.baseUrl + "list").subscribe(
      data => {
        let body = data.json();
        this.data = body;
      },
      err => {
        console.log(err);
      }
    );

  }

  public constructor(private http:Http) {
  }

  private baseUrl = "http://localhost:4000/v1/manage/";

  public data:Array<any> = undefined;

  public onStatusChange(id:string, newStatus:string) {
    this.http.post(this.baseUrl + "update/status?id=" + id + "&newStatus=" + newStatus, "").subscribe(
      data => {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].id === id) {
            this.data[i].status = newStatus;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  public listItems(order:Order):string {
    let result = "";
    let items = order.items;

    for (let i = 0; i < items.length; i++) {
      result += items[i].name + " x" + items[i].quantity + "<br>";
    }

    return result;
  }

  public getTitle(status:string) {
    if (status === 'confirmed') {
      return "Order Confirmed";
    } else if (status === 'rejected') {
      return "Order Rejected";
    }
  }

  public onModalAction(order:Order, status:string, dialog:any) {
    this.onStatusChange(order.id, status);
    this.modalOrder = null;
    dialog.hide();
    this.modalShippingCollateral = null;
    this.modalShippingReward = null;
  }

  public calcShippingPrices(order:Order) {
    let stackVolume = 0;
    let stackPrice = 0;

    let items = order.items;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      stackVolume += item.volume * item.quantity;
      stackPrice += item.price * item.quantity;
    }

    let collateral = stackPrice;
    let reward = stackPrice * 0.02 + stackVolume * 300;

    this.modalShippingCollateral = collateral;
    this.modalShippingReward = reward;
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

  public showDialog(order:Order, dialog:any) {
    dialog.show();
    this.modalOrder = order;
  }

  public showShippingDialog(order:Order, dialog:any) {
    this.calcShippingPrices(order);
    this.showDialog(order, dialog);
  }

  public getRecipient(order:Order):string {
    return order.client;
  }

  public onPriceChange(orderId:string, price:string) {

    price = price.replace("ISK", "").replace(" ", "").replace(",", "");

    this.http.post(this.baseUrl + "update/price?id=" + orderId + "&price=" + price, "").subscribe(
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

  public loadAndSetPrice(order:Order, price:number) {
    this.http.get("http://localhost:4000/v1/order/quote?link=" + order.link).subscribe(
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

  public addItemsToClipboard(order:Order) {
    this.clipboardData += this.listItems(order);
  }

  private checkShippingCosts(order:Order) {
    this.http.get("http://localhost:4000/v1/order/shippingprice?link=" + order.link).subscribe(
      data => {
        let body = data.json();
        let shippingPrice = Number(body.price);

        if (shippingPrice > order.setPrice) {
          alert("Order for " + order.client + " has negative margin of " + (order.setPrice - shippingPrice) / 1000000 + " mil ISK.");
        }

        this.http.post(this.baseUrl + "update/shippingPrice?id=" + order.id + "&shippingPrice=" + shippingPrice, "").subscribe(
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
