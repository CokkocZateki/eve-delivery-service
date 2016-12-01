import {Component, OnInit} from '@angular/core';
import {Order} from "../../common/order";
import {PilotSelfService} from "../../services/pilot-self.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {Router} from "@angular/router";
import {PickComponent} from "./pick/pick.component";
import {SecuredStatsService} from "../../services/secured-stats.service";

@Component({
  moduleId: module.id,
  selector: 'app-self-service',
  templateUrl: 'self-service.component.html',
  styleUrls: ['self-service.component.css'],
  providers: [PilotSelfService, SecuredStatsService],
  directives: [PickComponent],
  pipes: [NumberGrouping]
})
export class SelfServiceComponent implements OnInit {

  private orders: Array<Order>;
  private requestedValue: number;
  private requestedVolume: number;

  constructor(private pilotSelfService: PilotSelfService, private statsService:SecuredStatsService, private router: Router) {
  }

  ngOnInit() {
    this.pilotSelfService.getRequestedOrders().then(orders => this.orders = orders);

    this.statsService.getValueRequested().then(value => this.requestedValue = value);
    this.statsService.getVolumeRequested().then(volume => this.requestedVolume = volume);
  }

  getVolume(order: Order) {
    let totalVolume = 0.0;
    for (var i = 0; i < order.items.length; i++) {
      let item = order.items[i];
      totalVolume += item.quantity * item.volume;
    }
    return parseInt("" + totalVolume);
  }

  pick(orderId: string) {
    let link = ['/pilot', orderId];
    this.router.navigate(link);
  }
}
