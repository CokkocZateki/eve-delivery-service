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
  public modalShippingCollateral:number;
  public modalShippingReward:number;
  public clipboardData = "";

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

  public showShippingDialog(order:Order, dialog:any) {
    this.calcShippingPrices(order);
    this.showDialog(order, dialog);
  }

  public onModalAction(order:Order, status:string, dialog:any) {
    this.onStatusChange(order.id, status);
    this.modalOrder = null;
    dialog.close();
    this.modalShippingCollateral = null;
    this.modalShippingReward = null;
  }

  /** CLIPBOARDING **/

  public addItemsToClipboard(order:Order) {
    this.clipboardData += this.listItems(order);
  }

  public getRecipient(order:Order):string {
    return order.client;
  }

  public getTitle(status:string) {
    if (status === 'confirmed') {
      return "Delivery Service - Confirmed";
    } else if (status === 'rejected') {
      return "!! Delivery Service - Rejected !!";
    } else if (status === 'contracted') {
      return "Delivery Service - Contracted"
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

  /** ORDER UPDATES **/

  public onStatusChange(id:string, newStatus:string) {
    this.service.updateStatus(id, newStatus).subscribe(
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

  /** PRICING **/

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

  /** UTILITY **/

  public listItems(order:Order):string {
    let result = "";
    let items = order.items;

    for (let i = 0; i < items.length; i++) {
      result += items[i].name + " x" + items[i].quantity + "<br>";
    }

    return result;
  }

}
