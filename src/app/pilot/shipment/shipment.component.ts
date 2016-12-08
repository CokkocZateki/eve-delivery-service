import {Component, OnInit} from "@angular/core";
import {ContractedDialogComponent} from "../../manager/list/contracted-dialog/contracted-dialog.component";
import {OrderProcessingService} from "../../services/orderProcessing.service";
import {PilotService} from "../../services/pilot.service";
import {Order} from "../../common/order";
import {ManagerService} from "../../services/manager.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {ClipboardDirective} from "angular2-clipboard";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {InfoFittingComponent} from "./info-fitting/info-fitting.component";

@Component({
  selector: 'shipment',
  templateUrl: './app/pilot/shipment/shipment.component.html',
  providers: [PilotService, OrderProcessingService, ManagerService],
  directives: [ContractedDialogComponent, ClipboardDirective, ConfirmDialogComponent, InfoFittingComponent],
  pipes: [NumberGrouping],
})
export class ShipmentComponent implements OnInit {

  public orders:Array<any> = undefined;

  allClients:string = "";
  isContractedAll:boolean = false;
  isContractingAll:boolean = false;

  activatedOrder:string;

  mailTitle:string = "Horde Delivery - Contracted";
  mailBody:string = "Hi!<br/><br/>" +
    "Your order has been contracted to you. Let us know when you need more!<br/><br/>" +
    "We appreciate it if you recommend us to your friends and leave us a message at the forums: https://www.pandemic-legion.pl/forums/index.php?/topic/3184-new-delivery-service/<br/><br/>" +
    "Your Horde Delivery Service";

  constructor(private service:PilotService, private orderProcessing:OrderProcessingService) {
  }

  ngOnInit() {
    this.service.listShippingOrders().subscribe(
      data => {
        this.orders = data.json();
        console.log(this.orders);
        this.setAllClients();
      },
      err => {
        alert(err);
        console.log(err);
      }
    );
  }

  setActivated(orderId:string) {
    this.activatedOrder = orderId;
  }

  getStyle(orderId:string) {
    if(this.activatedOrder === orderId){
      return "#BDB76B";
    } else {
      return "";
    }
  }

  setAllClients() {
    for (var i = 0; i < this.orders.length; i++) {
      let order = this.orders[i];
      this.allClients += order.client + ", ";
    }
  }

  public onStatusChangeB(id:string, newStatus:string, orders:Array<Order>):Array<Order> {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === id) {
        orders[i].status = "Updating ...";
      }
    }
    this.service.updateStatus(id, newStatus).subscribe(
      data => {
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].id === id) {
            orders[i].status = newStatus;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
    return orders;
  }


  /** FORWARDER **/

  getRecipient(order:Order) {
    return this.orderProcessing.getRecipients(order);
  }

  generateMail(status:string, order:Order) {
    return this.orderProcessing.generateMail(status, order);
  }

  contracted(orderId:string) {
    for (var i = 0; i < this.orders.length; i++) {
      if (orderId === this.orders[i].id) {
        this.orders[i].status = 'contracted';
      }
    }
    this.orders = this.onStatusChangeB(orderId, 'contracted', this.orders);
  }

  confirmed(event:any) {
    if (event === 'all') {
      this.contractedAll();
    } else {
      this.contracted(event);
    }
  }

  contractedAll() {
    this.isContractingAll = true;
    this.service.contractedAll().subscribe(
      data => {
        this.isContractedAll = true;
        this.isContractingAll = false;
        for (var i = 0; i < this.orders.length; i++) {
          this.orders[i].status = 'contracted';
        }
      },
      err => alert(err)
    );
  }
}
