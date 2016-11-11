import {Component} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {SsoAuth} from "../../services/ssoauth.service";
import {environment} from "../../environment";
import {Router} from "@angular/router";

@Component({
  selector: 'status',
  providers: [SsoAuth],
  templateUrl: './app/frontpage/status/status.html',
})
export class StatusComponent {

  public constructor(private auth:SsoAuth, private router:Router) {
  }

  ssoHref = environment.ssoUrl + "&state=client";

  goToClientPage() {
    this.router.navigate(['/client']);
  }
}
