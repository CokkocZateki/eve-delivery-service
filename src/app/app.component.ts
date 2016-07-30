import {Component, OnInit} from '@angular/core';
import {ErrorComponent} from "./errors/error.component";
import {OrderComponent} from "./order/order.component";
import {StatusComponent} from "./status/status.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {Http} from "@angular/http";
import {environment} from "./environment";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [ErrorComponent, OrderComponent, StatusComponent, FeedbackComponent],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = "Horde Supermarket";

  public serviceDown = false;

  public constructor (private http:Http) {}

  ngOnInit() {
    this.http.get(environment.ip + "v1/alive/alive").subscribe(
      data => this.serviceDown = false,
      err => {
        this.serviceDown = true;
        console.log(err);
      }
    );
  }
}
