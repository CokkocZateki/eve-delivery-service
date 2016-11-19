import {Component, OnInit, HostListener} from "@angular/core";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {ClipboardDirective} from "angular2-clipboard";
import {NumberGrouping} from "../../../common/numberGrouping.pipe";
import {Order} from "../../../common/order";
import {OrderProcessingService} from "../../../services/orderProcessing.service";
import {PilotSelfService} from "../../../services/pilot-self.service";
import {ManagerService} from "../../../services/manager.service";
import {ClientComponent} from "./client/client.component";
import {ItemsComponent} from "./items/items.component";
import {ProcessBoughtComponent} from "./process-bought/process-bought.component";
import {ProcessSkipComponent} from "./process-skip/process-skip.component";
import {ProcessFlagComponent} from "./process-flag/process-flag.component";

@Component({
  selector: 'order-detail',
  templateUrl: 'app/pilot/self-service/order-detail/order-detail.component.html',
  providers: [OrderProcessingService, PilotSelfService, ManagerService],
  pipes: [NumberGrouping],
  directives: [ClipboardDirective, ClientComponent, ItemsComponent, ProcessBoughtComponent, ProcessSkipComponent,
  ProcessFlagComponent]
})
export class OrderDetailComponent implements OnInit {

  buyPrice: number;

  titleConfirmed = "Horde Delivery - Confirmed";
  titleContracted = "Horde Delivery - Contracted";
  private MARGIN = 0.13;

  constructor(private route: ActivatedRoute, private orderProcessing: OrderProcessingService,
              private selfService: PilotSelfService, private router: Router) {
  }

  order: Order;
  reward: number;

  process(action:string) {
    console.log(action);
    if (action === 'skipped') {
      this.orderSkipped();
    } else if (action === 'bought') {
      this.orderBought();
    } else if (action === 'flagged') {
      this.orderFlagged();
    }
  }

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
    this.router.navigate(['/pilot']);
  }

  orderSkipped() {
    this.isUntouched = false;
    this.selfService.skip(this.order.id).then(() => this.goBack());
  }

  orderBought() {
    this.isUntouched = false;
    this.selfService.bought(this.order.id).then(() => this.goBack());
  }

  orderFlagged() {
    this.isUntouched = false;
    let reason = "n/a";
    this.selfService.flag(this.order.id, reason).then(() => this.goBack());
  }

  isUntouched:boolean = true;

  ngOnDestroy() {
    if (this.isUntouched) {
      this.orderSkipped();
    }
  }
}
