import { Component, OnInit } from '@angular/core';
import {ListComponent} from "./list/list.component";
import {Auth} from "../services/auth.service";

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
