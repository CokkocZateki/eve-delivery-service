import {Component, OnInit, provide} from "@angular/core";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {ContractedDialogComponent} from "../../manager/list/contracted-dialog/contracted-dialog.component";
import {OrderProcessingService} from "../../services/orderProcessing.service";
import {PilotService} from "../../services/pilot.service";
import {Order} from "../../common/order";
import {ManagerService} from "../../services/manager.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {ClipboardDirective} from "angular2-clipboard";

@Component({
  selector: 'shipment',
  templateUrl: './app/pilot/shipment/shipment.component.html',
  providers: [provide(AuthConfig, {useValue: new AuthConfig()}), AuthHttp, PilotService, OrderProcessingService,
    ManagerService],
  directives: [ContractedDialogComponent, ClipboardDirective],
  pipes: [NumberGrouping],
})
export class ShipmentComponent implements OnInit {

  public orders:Array<any> = undefined;

  allClients:string = "";

  mailTitle:string = "Horde Delivery - Contracted";
  mailBody:string = "Hi!<br/><br/>" +
    "Your order has been contracted to you. Let us know when you need more!<br/><br/>" +
    "Would you like to see more items seeded? Try the new Market Seeder: http://hordedelivery.com/market<br/><br/>" +
    "We appreciate it if you recommend us to your friends and leave us a message at the forums: https://www.pandemic-legion.pl/forums/index.php?/topic/3184-new-delivery-service/<br/><br/>" +
    "Your Horde Delivery Service";

  constructor(private service:PilotService, private orderProcessing:OrderProcessingService) {
  }

  ngOnInit() {
    this.service.listShippingOrders().subscribe(
      data => {
        this.orders = data.json();
        this.setAllClients();
      },
      err => {
        alert(err);
        console.log(err);
      }
    );
  }

  setAllClients() {
    for (var i = 0; i < this.orders.length; i++) {
      let order = this.orders[i];
      this.allClients += order.client + ", ";
    }
  }

  contractedAll() {
    for (var i = 0; i < this.orders.length; i++) {
      let order = this.orders[i];
      this.orders = this.orderProcessing.onStatusChange(order.id, 'contracted', this.orders);
      order.status = 'contracted';
    }
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
    for (var i = 0; i < this.orders.length; i++) {
      if (orderId === this.orders[i].id) {
        this.orders[i].status = 'contracted';
      }
    }
  }
}
