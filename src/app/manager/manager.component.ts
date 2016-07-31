import { Component, OnInit } from '@angular/core';
import {Auth} from "../services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'app-manager',
  templateUrl: 'manager.component.html',
  providers: [Auth]
})
export class ManagerComponent {

  constructor(private auth:Auth) {
  }

}
