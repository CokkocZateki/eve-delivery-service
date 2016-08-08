import {Component, OnInit, provide} from '@angular/core';
import {Auth} from "../services/auth.service";
import {PilotService} from "../services/pilot.service";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {ConfirmDialogComponent} from "../manager/list/confirm-dialog/confirm-dialog.component";
import {OrderProcessingService} from "../services/orderProcessing.service";
import {Order} from "../common/order";
import {ManagerService} from "../services/manager.service";
import {ContractedDialogComponent} from "../manager/list/contracted-dialog/contracted-dialog.component";

@Component({
  selector: 'pilot',
  templateUrl: 'app/pilot/pilot.component.html',
  providers: [Auth, PilotService, provide(AuthConfig, {useValue: new AuthConfig()}), AuthHttp, OrderProcessingService,
    ManagerService],
  directives: [ContractedDialogComponent]
})
export class PilotComponent implements OnInit {

  public orders:Array<any> = undefined;

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

  constructor(private auth:Auth, private service:PilotService, private orderProcessing:OrderProcessingService) {
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
