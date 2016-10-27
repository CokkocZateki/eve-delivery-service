import {Component, OnInit} from "@angular/core";
import {ShipmentComponent} from "./shipment/shipment.component";
import {SsoAuth} from "../services/ssoauth.service";
import {PilotService} from "../services/pilot.service";

@Component({
  selector: 'pilot',
  templateUrl: 'app/pilot/pilot.component.html',
  providers: [SsoAuth, PilotService],
  directives: [ShipmentComponent]
})
export class PilotComponent implements OnInit {

  constructor(private auth: SsoAuth, private service: PilotService) {

  }

  currentPilot: any;
  name:string;

  ngOnInit() {
    this.service.getDetails().subscribe(
      data => {
        this.currentPilot = data.json();
        this.name = this.currentPilot.name;
      },
      err => console.log(err)
    )
  }
}
