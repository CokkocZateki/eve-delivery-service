import { Component, OnInit } from '@angular/core';
import {Auth} from "../services/auth.service";
import {ListComponent} from "./list/list.component";

@Component({
  moduleId: module.id,
  selector: 'app-manager',
  directives: [ListComponent],
  templateUrl: 'manager.component.html',
  providers: [Auth]
})
export class ManagerComponent {

  constructor(private auth:Auth) {
  }

}
