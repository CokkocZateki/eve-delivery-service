import {Component, OnInit} from "@angular/core";
import {ShipmentComponent} from "./shipment/shipment.component";
import {SsoAuth} from "../services/ssoauth.service";
import {PilotService} from "../services/pilot.service";
import {environment} from "../environment";
import {Router} from "@angular/router";

@Component({
  selector: 'pilot',
  templateUrl: 'app/pilot/pilot.component.html',
  providers: [SsoAuth, PilotService],
  directives: [ShipmentComponent]
})
export class PilotComponent implements OnInit {

  constructor(private auth: SsoAuth, private service: PilotService, private router: Router) {

  }

  ssoHref = environment.ssoUrl + "&state=pilot";
  currentPilot: any;
  name: string;

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
