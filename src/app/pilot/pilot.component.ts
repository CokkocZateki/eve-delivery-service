import {Component, OnInit, provide} from '@angular/core';
import {Auth} from "../services/auth.service";
import {PilotService} from "../services/pilot.service";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";

@Component({
  moduleId: module.id,
  selector: 'app-pilot',
  templateUrl: 'pilot.component.html',
  providers: [Auth, PilotService, provide(AuthConfig, {useValue: new AuthConfig()}), AuthHttp]
})
export class PilotComponent implements OnInit {

  ngOnInit() {
    setTimeout(() => {
      if (this.auth.authenticated()) {
        this.getCurrentSelection();
        return;
      }
    }, 100);
  }

  getCurrentSelection() {
    this.service.getAvailability().subscribe(
      data => {
        let body = data.json();
        if (body.canShip === "true") {
          this.canShip = true;
        } else {
          this.canShip = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  canShip:boolean;

  constructor(private auth:Auth, private service:PilotService) {
  }

  onRunSelection(canShip:boolean) {
    this.canShip = canShip;
    this.service.updateAvailability(canShip).subscribe(
      data => {
      },
      err => {
        console.log(err);
        alert("An error occurred. Please report this. Your status could not be updated.");
      }
    );
  }

  getSelectionTitle():string {
    if (this.canShip) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

}
