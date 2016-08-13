import {Component, OnInit, provide} from "@angular/core";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {ContractedDialogComponent} from "../../manager/list/contracted-dialog/contracted-dialog.component";
import {OrderProcessingService} from "../../services/orderProcessing.service";
import {PilotService} from "../../services/pilot.service";
import {Order} from "../../common/order";
import {ManagerService} from "../../services/manager.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";

@Component({
  selector: 'shipment',
  templateUrl: './app/pilot/shipment/shipment.component.html',
  providers: [provide(AuthConfig, {useValue: new AuthConfig()}), AuthHttp, PilotService, OrderProcessingService,
    ManagerService],
  directives: [ContractedDialogComponent],
  pipes: [NumberGrouping]
})
export class ShipmentComponent implements OnInit {

  public orders:Array<any> = undefined;

  constructor(private service:PilotService, private orderProcessing:OrderProcessingService) {
  }

  ngOnInit() {
    this.service.listShippingOrders().subscribe(
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
    for(var i = 0; i < this.orders.length; i++) {
      if (orderId === this.orders[i].id) {
        this.orders[i].status = 'contracted';
      }
    }
  }

  getCompleteMessage() {
    var compliments = ['You\'re awesome!', 'Keep up the good work!', 'Keep on rollin\'', 'JF pilot of our hears!'];
    var result = compliments[Math.floor(Math.random() * compliments.length)];
    return result;
  }

}
