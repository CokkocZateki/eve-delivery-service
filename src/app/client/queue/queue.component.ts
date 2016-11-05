import {Component, OnInit} from "@angular/core";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {ClientService} from "../../services/client.service";
import {Order} from "../../common/order";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@Component({
  moduleId: module.id,
  selector: 'app-queue',
  templateUrl: 'queue.component.html',
  styleUrls: ['queue.component.css'],
  pipes: [NumberGrouping],
  providers: [ClientService],
  directives: [ConfirmDialogComponent]
})
export class QueueComponent implements OnInit {

  constructor(private service: ClientService) {
  }

  orders: Array<Order>;
  ordersLoaded: boolean;

  ngOnInit() {
    this.service.queue().subscribe(
      data => {
        this.orders = data.json();
        this.ordersLoaded = true;
      },
      err => console.log(err)
    );
  }

  deleteOrder(order: Order) {
    this.service.delete(order.id).subscribe(
      data => {
        // remove from orders
        var index = this.orders.indexOf(order);
        if (index > -1) {
          this.orders.splice(index, 1);
        }
      },
      err => {
        // todo: update this message with alt linking?
        alert("The order could not be deleted as we already work on it or it doesn't belong to you.");
        console.log(err);
      }
    );
  }


}
