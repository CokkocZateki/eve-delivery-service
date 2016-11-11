import { Component, OnInit } from '@angular/core';
import {Order} from "../../common/order";
import {PilotSelfService} from "../../services/pilot-self.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-self-service',
  templateUrl: 'self-service.component.html',
  styleUrls: ['self-service.component.css'],
  providers: [PilotSelfService],
  pipes: [NumberGrouping]
})
export class SelfServiceComponent implements OnInit {

  private orders:Array<Order>;

  constructor(private pilotSelfService:PilotSelfService, private router:Router) { }

  ngOnInit() {
    this.pilotSelfService.getRequestedOrders().then(orders => this.orders = orders);

    // this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  getVolume(order:Order) {
    return 10000;
  }

  pick(orderId:string) {
    let link = ['/pilot', orderId];
    this.router.navigate(link);
  }
}
