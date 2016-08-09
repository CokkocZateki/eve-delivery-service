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
import {OrderProcessingService} from "../../services/orderProcessing.service";


@Component({
  selector: 'list',
  templateUrl: 'app/manager/list/list.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective, ConfirmDialogComponent, RejectDialogComponent,
    ContractedDialogComponent, ShippingDialogComponent],
  providers: [ManagerService, OrderService, provide(AuthConfig, {useValue: new AuthConfig()}), AuthHttp,
    OrderProcessingService],
  pipes: [NumberGrouping]
})
export class ListComponent implements OnInit {


  private deliveryFee = 0.13;
  private managementMargin = 0.2;
  private pilotMargin = 0.8;

  public orders:Array<any> = undefined;
  public clipboardData = "";

  constructor(private service:ManagerService, private orderService:OrderService,
              private orderProcessing:OrderProcessingService) {
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

  /** FORWARDER **/

  getRecipient(order:Order) {
    return this.orderProcessing.getRecipient(order);
  }

  generateMail(status:string, order:Order) {
    return this.orderProcessing.generateMail(status, order);
  }

  onStatusChange(orderId:string, status:string) {
    this.orders = this.orderProcessing.onStatusChange(orderId, status, this.orders);
  }

  getExchangeDescription(order:Order) {
    return this.orderProcessing.getExchangeDescription(order);
  }

  /** CLIPBOARDING **/

  public addItemsToClipboard(order:Order) {
    this.clipboardData += this.listItems(order);
  }

  /** PRICING **/

  public calcExchangePrice(order:Order):number {
    let collateral = this.calcCollateral(order);
    let managementReward = parseInt("" + this.calcManagementReward(collateral));
    return collateral + managementReward;
  }

  public calcManagementReward(basePrice:number):number {
    return basePrice * this.deliveryFee * this.managementMargin;
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
    return this.calcCollateral(order) * this.deliveryFee * this.pilotMargin;
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
