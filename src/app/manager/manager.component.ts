import { Component, OnInit } from '@angular/core';
import {ListComponent} from "./list/list.component";
import {Auth} from "../services/auth.service";
import {StatsComponent} from "./stats/stats.component";
import {PilotStatusComponent} from "./pilot-status/pilot-status.component";
import {CargoComponent} from "./cargo/cargo.component";

@Component({
  moduleId: module.id,
  selector: 'app-manager',
  directives: [ListComponent, StatsComponent, PilotStatusComponent, CargoComponent],
  templateUrl: 'manager.component.html',
  providers: [Auth]
})
export class ManagerComponent {

  constructor(private auth:Auth) {
  }

}
