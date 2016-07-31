import {Component, OnInit, provide} from '@angular/core';
import {ManagerService} from "../../services/manager.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {OrderService} from "../../services/order.service";
import {MODAL_DIRECTIVES} from 'ng2-bs3-modal/ng2-bs3-modal';
import {ClipboardDirective} from 'angular2-clipboard';
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";


@Component({
  moduleId: module.id,
  selector: 'stats',
  templateUrl: 'stats.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective],
  providers: [ManagerService, OrderService, provide(AuthConfig, {useValue: new AuthConfig()}),AuthHttp],
  pipes: [NumberGrouping]
})
export class StatsComponent implements OnInit {

  private requestCount:number;
  private alertStatus = "";

  constructor(private service:ManagerService) {
  }

  ngOnInit() {
    this.service.countRequests().subscribe(
      data => {
        this.requestCount = data.json().requestCount;
        if (this.requestCount == 0) {
          this.alertStatus = "alert-success";
        }
        if (this.requestCount > 0) {
          this.alertStatus = "alert-warning";
        }
        if (this.requestCount > 3) {
          this.alertStatus = "alert-danger";
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
