import {Component, OnInit, Input} from '@angular/core';
import {SsoAuth} from "../services/ssoauth.service";
import {environment} from "../environment";
import {UserService} from "../services/user.service";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent implements OnInit {

  @Input() currentPage:string;

  ssoHref = environment.ssoUrl + "&state=";
  currentPilot: any;
  name: string;

  constructor(private auth: SsoAuth, private service: UserService) { }

  ngOnInit() {
    this.ssoHref += this.currentPage;

    this.service.getDetails().subscribe(
      data => {
        this.currentPilot = data.json();
        this.name = this.currentPilot.name;
      },
      err => console.log(err)
    )
  }

  isPilot():boolean {
    var roles = this.currentPilot.role;
    return roles.includes("PILOT");
  }

}
