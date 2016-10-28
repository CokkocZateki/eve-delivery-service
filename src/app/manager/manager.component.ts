import {Component, OnInit} from "@angular/core";
import {ListComponent} from "./list/list.component";
import {CargoComponent} from "./cargo/cargo.component";
import {SsoAuth} from "../services/ssoauth.service";
import {environment} from "../environment";
import {Router} from "@angular/router";

@Component({
  selector: 'manager',
  directives: [ListComponent, CargoComponent],
  templateUrl: 'app/manager/manager.component.html',
  providers: [SsoAuth]
})
export class ManagerComponent implements OnInit {

  ssoHref = environment.ssoUrl + "&state=manager";

  constructor(private auth:SsoAuth, private router:Router) {
  }

  ngOnInit() {
    this.auth.isAuthorized("manager").subscribe(
      data => {},
      err => this.router.navigate(['/unauthorized'])
    );
  }

}
