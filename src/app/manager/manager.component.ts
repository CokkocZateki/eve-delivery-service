import {Component, OnInit} from "@angular/core";
import {ListComponent} from "./list/list.component";
import {CargoComponent} from "./cargo/cargo.component";
import {SsoAuth} from "../services/ssoauth.service";

@Component({
  selector: 'manager',
  directives: [ListComponent, CargoComponent],
  templateUrl: 'app/manager/manager.component.html',
  providers: [SsoAuth]
})
export class ManagerComponent implements OnInit {

  constructor(private auth:SsoAuth) {
  }

  ngOnInit() {

  }

}
