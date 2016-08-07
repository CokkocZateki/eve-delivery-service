import { Component, OnInit } from '@angular/core';
import {OrderComponent} from "./order/order.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {StatusComponent} from "./status/status.component";
import {StatsComponent} from "./stats/stats.component";

@Component({
  moduleId: module.id,
  selector: 'client',
  templateUrl: 'client.component.html',
  directives: [OrderComponent, FeedbackComponent, StatusComponent, StatsComponent],
  styleUrls: ['client.component.css']
})
export class ClientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
