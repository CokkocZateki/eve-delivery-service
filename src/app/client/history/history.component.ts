import { Component, OnInit } from '@angular/core';
import {Order} from "../../common/order";
import {ClientService} from "../../services/client.service";

@Component({
  moduleId: module.id,
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.css'],
  providers: [ClientService]
})
export class HistoryComponent implements OnInit {

  orders: Order[];

  constructor(private service:ClientService) { }

  ngOnInit() {
    this.service.history().then(orders => this.orders = orders);
  }

}
