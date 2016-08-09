import {Component} from "@angular/core";
import {ListComponent} from "./list/list.component";
import {Auth} from "../services/auth.service";
import {StatsComponent} from "./stats/stats.component";
import {CargoComponent} from "./cargo/cargo.component";

@Component({
  selector: 'manager',
  directives: [ListComponent, StatsComponent, CargoComponent],
  templateUrl: 'app/manager/manager.component.html',
  providers: [Auth]
})
export class ManagerComponent {

  constructor(private auth:Auth) {
  }

}
