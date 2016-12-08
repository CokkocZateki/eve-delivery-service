import {Component, OnInit} from '@angular/core';
import {OrderComponent} from "./order/order.component";
import {StatusComponent} from "./status/status.component";
import {StatsComponent} from "./stats/stats.component";
import {TestimonialsComponent} from "./testimonials/testimonials.component";
import {SsoAuth} from "../services/ssoauth.service";
import {environment} from "../environment";
import {Router, Params, ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'frontpage',
  templateUrl: 'frontpage.component.html',
  directives: [OrderComponent, StatusComponent, StatsComponent, TestimonialsComponent],
  styleUrls: ['frontpage.component.css'],
  providers: [SsoAuth]
})
export class FrontPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: SsoAuth, private router: Router) {
  }

  ssoHref = environment.ssoUrl + "&state=client";

  public prefillName: string;
  public prefillDestination: string;
  public prefillLink: string;
  public prefit: string;

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
        this.prefillName = params['name'];
        this.prefillDestination = params['destination'];
        this.prefillLink = params['link'];
        this.prefit = params['prefit'];
      }
    );
  }

  goToClientPage() {
    this.router.navigate(['/client']);
  }
}
