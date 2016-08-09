import {Component} from "@angular/core";
import {Auth} from "../services/auth.service";
import {ShipmentComponent} from "./shipment/shipment.component";

@Component({
  selector: 'pilot',
  templateUrl: 'app/pilot/pilot.component.html',
  providers: [Auth],
  directives: [ShipmentComponent]
})
export class PilotComponent {

  constructor(private auth:Auth) {
  }

}
