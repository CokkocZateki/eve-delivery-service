import {Component, OnInit} from '@angular/core';
import {SsoAuth} from "../services/ssoauth.service";
import {ClientService} from "../services/client.service";
import {QueueComponent} from "./queue/queue.component";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-client',
  templateUrl: 'client.component.html',
  styleUrls: ['client.component.css'],
  providers: [SsoAuth, ClientService],
  directives: [QueueComponent]
})
export class ClientComponent implements OnInit {

  constructor(private auth: SsoAuth, private service: ClientService, private router:Router) {
  }

  currentUser: any;
  clientName: string;

  ngOnInit() {
    this.service.name().subscribe(
      data => {
        this.currentUser = data.json();
        this.clientName = this.currentUser.name;
      },
      // TODO: better error message
      err => alert(err)
    );
  }

  goToFrontpage() {
    this.router.navigate(['/'])
  }

}
