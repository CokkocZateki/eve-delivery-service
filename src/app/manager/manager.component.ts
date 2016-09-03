import {Component} from "@angular/core";
import {ListComponent} from "./list/list.component";
import {Auth} from "../services/auth.service";
import {CargoComponent} from "./cargo/cargo.component";
import {FeedbackComponent} from "./feedback/feedback.component";

@Component({
  selector: 'manager',
  directives: [ListComponent, CargoComponent, FeedbackComponent],
  templateUrl: 'app/manager/manager.component.html',
  providers: [Auth]
})
export class ManagerComponent {

  constructor(private auth:Auth) {
  }

}
