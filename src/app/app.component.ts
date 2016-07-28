import { Component } from '@angular/core';
import {ErrorComponent} from "./errors/error.component";
import {OrderComponent} from "./order/order.component";
import {StatusComponent} from "./status/status.component";
import {FeedbackComponent} from "./feedback/feedback.component";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [ErrorComponent, OrderComponent, StatusComponent, FeedbackComponent],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = "Horde Supermarket";

  public serviceDown = false;

  ngOnInit() {
    // todo: load dynamically
    this.serviceDown = false;
  }
}
