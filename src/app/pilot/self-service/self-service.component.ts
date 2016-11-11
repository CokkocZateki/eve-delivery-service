import { Component, OnInit } from '@angular/core';
import {PilotService} from "../../services/pilot.service";

@Component({
  moduleId: module.id,
  selector: 'app-self-service',
  templateUrl: 'self-service.component.html',
  styleUrls: ['self-service.component.css']
})
export class SelfServiceComponent implements OnInit {

  constructor(private pilotService:PilotService) { }

  ngOnInit() {
    // this.pilotService.getRequestedOrders()
  }



}
