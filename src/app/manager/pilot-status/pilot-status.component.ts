import {Component, OnInit, provide} from '@angular/core';
import {PilotService} from "../../services/pilot.service";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {DatePipe} from "@angular/common";

@Component({
  moduleId: module.id,
  selector: 'pilot-status',
  templateUrl: 'pilot-status.component.html',
  providers: [PilotService, provide(AuthConfig, {useValue: new AuthConfig()}), AuthHttp],
  pipes: [DatePipe]
})
export class PilotStatusComponent implements OnInit {

  pilotStats = [
    {
      name: "Loading ",
      status: "...",
      date: new Date()
    }
  ];

  constructor(private service:PilotService) {
  }

  ngOnInit() {
    this.service.getAvailabilityAll().subscribe(
      data => {
        this.pilotStats = data.json();
        for (let i = 0; i < this.pilotStats.length; i++) {
          var apiDate = this.pilotStats[i].date;
          var year = apiDate['year'];
          var month = apiDate['monthValue'] - 1;
          var day = apiDate['dayOfMonth'];
          var hour = apiDate['hour'];
          var minute = apiDate['minute'];
          let date = new Date(year, month, day, hour, minute, 0, 0);
          this.pilotStats[i].date = date;
        }
      },
      err => {
        console.log(err)
      }
    );
  }

  getPilotAvailabilityClass(pilot:any) {
    if (pilot.status === "yes") {
      return "alert alert-success";
    }
  }
}
