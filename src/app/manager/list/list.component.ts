import {Component, OnInit, provide} from "@angular/core";
import {ManagerService} from "../../services/manager.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {Order} from "../../common/order";
import {OrderService} from "../../services/order.service";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {RejectDialogComponent} from "./rejected-dialog/rejected-dialog.component";
import {ContractedDialogComponent} from "./contracted-dialog/contracted-dialog.component";
import {ShippingDialogComponent} from "./shipping-dialog/shipping-dialog.component";


@Component({
  moduleId: module.id,
  selector: 'list',
  templateUrl: 'list.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective, ConfirmDialogComponent, RejectDialogComponent,
    ContractedDialogComponent, ShippingDialogComponent],
  providers: [ManagerService, OrderService, provide(AuthConfig, {useValue: new AuthConfig()}),AuthHttp],
  pipes: [NumberGrouping]
})
export class ListComponent implements OnInit {

  public orders:Array<any> = undefined;
  public clipboardData = "";

  private targetSystem = "7RM";
  private margin = "13%";

  constructor(private service:ManagerService, private orderService:OrderService) {
  }

  ngOnInit() {
    this.service.list().subscribe(
      data => {
        this.orders = data.json();
      },
      err => {
        alert(err);
        console.log(err);
      }
    );
  }

  /** CLIPBOARDING **/

  public getExchangeDescription(order:Order) {
    let client = order.client;
    let price = order.setPrice;
    return "To '" + client + "' for " + new NumberGrouping().transform(price) + " ISK";
  }

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
      result += "Thank you for your order (" + order.link + "). With a " + this.margin + " delivery fee to " + this.targetSystem + " it will cost " + new NumberGrouping().transform(order.setPrice) + ".00 ISK. Shipping will start soon!";
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
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].id === id) {
        this.orders[i].status = "Updating ...";
      }
    }
    this.service.updateStatus(id, newStatus).subscribe(
      data => {
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i].id === id) {
            this.orders[i].status = newStatus;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  /** PRICING **/

  public calcExchangePrice(order:Order):number {
    let collateral = this.calcCollateral(order);
    let managementReward = parseInt(""+this.calcManagementReward(collateral));
    return collateral + managementReward;
  }

  public calcManagementReward(basePrice:number):number {
    return basePrice * 1.13 * 0.02;
  }

  public calcCollateral(order:Order):number {
    let stackPrice = 0;
    let items = order.items;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      stackPrice += item.price * item.quantity;
    }
    return stackPrice;
  }

  public calcReward(order:Order):number {
    return this.calcCollateral(order) * 0.13 * 0.8;
  }

  public loadAndSetPrice(order:Order) {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].id === order.id) {
        this.orders[i].price = "Loading ...";
      }
    }

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
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].id === orderId) {
        this.orders[i].price = "Loading ...";
      }
    }
    price = price.replace("ISK", "").replace(" ", "").replace(",", "");

    this.service.updatePrice(orderId, price).subscribe(
      data => {
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i].id === orderId) {
            this.orders[i].price = price;
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
