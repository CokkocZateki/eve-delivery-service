import {Component, OnInit} from '@angular/core';
import {OrderComponent} from "./order/order.component";
import {TestimonialsComponent} from "./testimonials/testimonials.component";
import {SsoAuth} from "../services/ssoauth.service";
import {environment} from "../environment";
import {Router, Params, ActivatedRoute} from "@angular/router";

import {StatsService} from "../services/stats.service";


@Component({
  moduleId: module.id,
  selector: 'frontpage',
  templateUrl: 'frontpage.component.html',
  directives: [OrderComponent, TestimonialsComponent],
  styleUrls: ['frontpage.component.css'],
  providers: [SsoAuth, StatsService]
})
export class FrontPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: SsoAuth, private router: Router,
              private statsService:StatsService) {
  }

  ssoHref = environment.ssoUrl + "&state=client";

  public prefillName: string;
  public prefillDestination: string;
  public prefillLink: string;

  queueSize:string;
  completedCount:string;
  averageHours:string;

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
        this.prefillName = params['name'];
        this.prefillDestination = params['destination'];
        this.prefillLink = params['link'];
        console.log(this.prefillLink)
      }
    );

    this.statsService.requested().subscribe(
      data => this.queueSize = "" + data.json().requested,
      err => {
        console.log(err);
      }
    );
    this.statsService.completed().subscribe(
      data => this.completedCount = "" + data.json().completed,
      err => {
        console.log(err);
      }
    );
    this.statsService.averageTime().subscribe(
      data => this.averageHours = "" + data.json().averageTime,
      err => {
        console.log(err);
      }
    );
  }

  goToClientPage() {
    this.router.navigate(['/client']);
  }
}
