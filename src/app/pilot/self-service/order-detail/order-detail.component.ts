import {Component, OnInit} from "@angular/core";
import {Params, ActivatedRoute} from "@angular/router";
import {ClipboardDirective} from "angular2-clipboard";
import {NumberGrouping} from "../../../common/numberGrouping.pipe";
import {Order} from "../../../common/order";
import {OrderProcessingService} from "../../../services/orderProcessing.service";
import {PilotSelfService} from "../../../services/pilot-self.service";
import {ManagerService} from "../../../services/manager.service";
import {ClientComponent} from "./client/client.component";
import {ItemsComponent} from "./items/items.component";

@Component({
  selector: 'order-detail',
  templateUrl: 'app/pilot/self-service/order-detail/order-detail.component.html',
  providers: [OrderProcessingService, PilotSelfService, ManagerService],
  pipes: [NumberGrouping],
  directives: [ClipboardDirective, ClientComponent, ItemsComponent]
})
export class OrderDetailComponent implements OnInit {

  buyPrice: number;

  titleConfirmed = "Horde Delivery - Confirmed";
  titleContracted = "Horde Delivery - Contracted";
  private MARGIN = 0.13;

  constructor(private route: ActivatedRoute, private orderProcessing: OrderProcessingService,
              private selfService: PilotSelfService) {
  }

  order: Order;
  reward: number;

  /** FORWARDER **/

  getRecipient(order: Order) {
    return this.orderProcessing.getRecipients(order);
  }

  generateMail(status: string, order: Order) {
    return this.orderProcessing.generateMail(status, order);
  }

  getExchangeDescription(order: Order) {
    return this.orderProcessing.getExchangeDescription(order);
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
        let id = params['id'];
        this.selfService.pick(id).then(order => {
          this.order = order;
          this.reward = this.calculateReward();
          this.buyPrice = this.calcBuyPrice();
        });
      }
    );
  }


  private calculateReward(): number {
    return parseInt("" + (this.order.expectedPrice * this.MARGIN));
  }

  private calcBuyPrice(): number {
    let stackPrice = 0;
    let items = this.order.items;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      stackPrice += item.price * item.quantity;
    }
    return stackPrice;
  }

  goBack() {
    window.history.back();
  }

  getVolume(order:Order) {
    return 10000;
  }

  acceptOrder() {

  }

  skipOrder() {

    this.goBack();
  }

  flagOrder() {

  }
}
