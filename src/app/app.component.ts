import {Component, OnInit} from '@angular/core';
import {ErrorComponent} from "./errors/error.component";
import {OrderComponent} from "./client/order/order.component";
import {StatusComponent} from "./client/status/status.component";
import {Http} from "@angular/http";
import {environment} from "./environment";
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [ErrorComponent, OrderComponent, StatusComponent, ROUTER_DIRECTIVES],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = "Horde Delivery Service";

  public serviceDown = false;

  public constructor (private http:Http) {}

  ngOnInit() {
    this.http.get(environment.ip + "alive").subscribe(
      data => this.serviceDown = false,
      err => {
        this.serviceDown = true;
      }
    );
  }
}
