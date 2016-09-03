import {Component, OnInit, provide} from "@angular/core";
import {Params, ActivatedRoute} from "@angular/router";
import {ManagerService} from "../../services/manager.service";
import {Order} from "../../common/order";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {ClipboardDirective} from "angular2-clipboard";
import {LocalDateTimeToDate} from "../../common/localDateTimeToDate";
import {OrderProcessingService} from "../../services/orderProcessing.service";

@Component({
  selector: 'manager-detail',
  templateUrl: 'app/manager/manager-detail/manager-detail.component.html',
  providers: [ManagerService, provide(AuthConfig, {useValue: new AuthConfig()}), AuthHttp, OrderProcessingService],
  pipes: [NumberGrouping, LocalDateTimeToDate],
  directives: [ClipboardDirective]
})
export class ManagerDetailComponent implements OnInit {

  corporateDeliveryFee = 0.13;
  corporateManagementMargin = 0.2;
  corporatePilotMargin = 0.8;

  buyPrice:number;
  corporateManagementReward:number;
  corporatePilotReward:number;
  serviceManagementReward:number;
  serviceContractReward:number;

  exchangePrice:number;

  titleConfirmed = "Delivery Service - Confirmed";
  titleContracted = "Delivery Service - Contracted";

  constructor(private route:ActivatedRoute, private service:ManagerService, private orderProcessing:OrderProcessingService) {
  }

  order:Order;

  /** FORWARDER **/

  getRecipient(order:Order) {
    return this.orderProcessing.getRecipient(order);
  }

  generateMail(status:string, order:Order) {
    return this.orderProcessing.generateMail(status, order);
  }

  deleteOrder(order:Order) {
    this.service.delete(order.id).subscribe(
      data => this.goBack(),
      err => alert(err)
    )
  }

  // onStatusChange(orderId:string, status:string) {
  //   this.orders = this.orderProcessing.onStatusChange(orderId, status, this.orders);
  // }

  getExchangeDescription(order:Order) {
    return this.orderProcessing.getExchangeDescription(order);
  }

  onOrderAssigned(orderId:string, assignee:string) {
    this.service.updateAssignee(orderId, assignee).subscribe(
      data => {
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  ngOnInit() {
    this.route.params.forEach((params:Params) => {
        let id = params['id'];

        this.service.getOrder(id).subscribe(
          data => {
            this.order = data.json();
            this.calculate();
          },
          err => {
            console.log(err);
            alert(err);
          }
        );
      }
    );
  }

  private calculate() {
    this.buyPrice = this.calcBuyPrice();
    this.corporatePilotReward = this.calcCorporatePilotReward();
    this.corporateManagementReward = this.calcCorporateManagementReward();
    this.serviceContractReward = this.calcServiceContractReward();
    this.serviceManagementReward = this.calcServiceManagementReward();
    this.exchangePrice = this.calcExchangePrice()
  }

  public calcExchangePrice():number {
    return parseInt("" + (this.buyPrice + this.corporateManagementReward));
  }

  private calcCorporateManagementReward():number {
    let basePrice = this.buyPrice;
    return parseInt("" + (basePrice * this.corporateDeliveryFee * this.corporateManagementMargin));
  }

  private calcCorporatePilotReward():number {
    let basePrice = this.buyPrice;
    return parseInt("" + (basePrice * this.corporateDeliveryFee * this.corporatePilotMargin));
  }

  private calcServiceContractReward():number {
    let collateralFee = this.buyPrice * 0.02;

    let volumeUnitFee;
    if (this.order.destination === '7RM Beanstar') {
      volumeUnitFee = 300;
    } else {
      volumeUnitFee = 400;
    }

    let volumeFee = 0;
    for (var i = 0; i < this.order.items.length; i++) {
      let item = this.order.items[i];
      volumeFee += item.volume * item.quantity * volumeUnitFee;
    }

    return parseInt("" + (collateralFee + volumeFee));
  }

  private calcServiceManagementReward():number {
    return parseInt("" + (this.order.expectedPrice - this.buyPrice - this.serviceContractReward));
  }

  private calcBuyPrice():number {
    let stackPrice = 0;
    let items = this.order.items;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      stackPrice += item.price * item.quantity;
    }
    return stackPrice;
  }

  updateStatus(order:Order, newStatus:string) {
    this.service.updateStatus(order.id, newStatus).subscribe(
      data => {
        order.status = newStatus;
        if (order.status === 'contracted') {
          this.goBack();
        }
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  switchAssignee(order:Order) {
    if (order.assignee === 'service') {
      order.assignee = 'corporate';
    } else {
      order.assignee = 'service';
    }

    // todo: update service against service
    this.service.updateAssignee(order.id, order.assignee).subscribe(
      data => {
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  listItems(order:Order):string {
    let result = "";
    let items = order.items;

    for (let i = 0; i < items.length; i++) {
      result += items[i].name + " x" + items[i].quantity + "<br>";
    }

    return result;
  }

  goBack() {
    window.history.back();
  }


}
