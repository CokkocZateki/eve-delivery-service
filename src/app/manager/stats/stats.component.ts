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

  private requestClass = "";
  private shipmentClass = "";
  private mailClass = "";
  private requestCount:any = "Loading ...";
  private activeShippingCount:any = "Loading ...";
  private waitingForShipping:any = "Loading ...";
  private ordersReadyForContracting:any = "Loading ...";
  private hasUnreadMail:string = "Loading ...";

  constructor(private service:ManagerService) {
  }

  ngOnInit() {
    this.service.countRequests().subscribe(
      data => {
        this.requestCount = data.json().requestCount;
        if (this.requestCount > 0) {
          this.requestClass = "alert alert-danger";
        }
      },
      err => {
        console.log(err);
        this.requestCount = "ERROR";
      }
    );

    this.service.hasUnreadMail().subscribe(
      data => {
        this.hasUnreadMail = data.json().hasUnreadMail;
        if (this.hasUnreadMail === 'maybe') {
          this.mailClass = "alert alert-warning";
        } else if (this.hasUnreadMail === 'yes') {
          this.mailClass = "alert alert-danger";
        }
      },
      err => {
        console.log(err);
        this.hasUnreadMail = "ERROR";
      }
    );

    // this.service.activeShippingContracts().subscribe(
    //   data => {
    //     let body = data.json();
    //     this.activeShippingCount = body.activeShippingContracts;
    //   },
    //   err => {
    //     console.log(err);
    //     this.activeShippingCount = "ERROR";
    //   }
    // );
    //
    // this.service.waitingForShippingContracts().subscribe(
    //   data => {
    //     let body = data.json();
    //     this.waitingForShipping = body.waitingForShippingContracts;
    //   },
    //   err => {
    //     console.log(err);
    //     this.waitingForShipping = "ERROR";
    //   }
    // );

    // this.service.ordersReadyForContracting().subscribe(
    //   data => {
    //     let body = data.json();
    //     this.ordersReadyForContracting = body.ordersReadyForContracting;
    //     if (this.ordersReadyForContracting > 0) {
    //       this.shipmentClass = "alert alert-danger";
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //     this.ordersReadyForContracting = "ERROR";
    //   }
    // );
  }
}
