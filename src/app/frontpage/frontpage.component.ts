import { Component, OnInit } from '@angular/core';
import {OrderComponent} from "./order/order.component";
import {StatusComponent} from "./status/status.component";
import {StatsComponent} from "./stats/stats.component";
import {TestimonialsComponent} from "./testimonials/testimonials.component";
import {SsoAuth} from "../services/ssoauth.service";
import {environment} from "../environment";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'frontpage',
  templateUrl: 'frontpage.component.html',
  directives: [OrderComponent, StatusComponent, StatsComponent, TestimonialsComponent],
  styleUrls: ['frontpage.component.css'],
  providers: [SsoAuth]
})
export class FrontPageComponent implements OnInit {

  constructor(private auth: SsoAuth, private router:Router) { }

  ssoHref = environment.ssoUrl + "&state=client";

  ngOnInit() {
  }

  goToClientPage() {
    this.router.navigate(['/client']);
  }
}
