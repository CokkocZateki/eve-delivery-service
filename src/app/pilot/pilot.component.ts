import {Component, OnInit} from "@angular/core";
import {ShipmentComponent} from "./shipment/shipment.component";
import {SsoAuth} from "../services/ssoauth.service";
import {PilotService} from "../services/pilot.service";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {SelfServiceComponent} from "./self-service/self-service.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {CargoComponent} from "./cargo/cargo.component";

@Component({
  selector: 'pilot',
  templateUrl: 'app/pilot/pilot.component.html',
  providers: [SsoAuth, PilotService],
  directives: [ShipmentComponent, SelfServiceComponent, ROUTER_DIRECTIVES, NavbarComponent, CargoComponent]
})
export class PilotComponent implements OnInit {

  constructor(private auth: SsoAuth, private service: PilotService, private router: Router) {

  }

  ngOnInit() {
  }
}
