import {Component, OnInit} from "@angular/core";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {ClientService} from "../../services/client.service";
import {Order} from "../../common/order";

@Component({
  moduleId: module.id,
  selector: 'app-queue',
  templateUrl: 'queue.component.html',
  styleUrls: ['queue.component.css'],
  pipes: [NumberGrouping],
  providers: [ClientService]
})
export class QueueComponent implements OnInit {

  constructor(private service:ClientService) { }

  orders:Array<Order>;
  ordersLoaded:boolean;

  ngOnInit() {
    this.service.queue().subscribe(
      data => {
        this.orders = data.json();
        this.ordersLoaded = true;
      },
      err => console.log(err)
    );
  }

}
