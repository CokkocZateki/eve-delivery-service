import { Component, OnInit } from '@angular/core';
import {ListComponent} from "./list/list.component";
import {Auth} from "../services/auth.service";
import {StatsComponent} from "./stats/stats.component";
import {PilotStatusComponent} from "./pilot-status/pilot-status.component";

@Component({
  moduleId: module.id,
  selector: 'app-manager',
  directives: [ListComponent, StatsComponent, PilotStatusComponent],
  templateUrl: 'manager.component.html',
  providers: [Auth]
})
export class ManagerComponent {

  constructor(private auth:Auth) {
  }

}
