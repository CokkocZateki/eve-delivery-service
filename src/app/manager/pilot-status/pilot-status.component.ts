import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pilot-status',
  templateUrl: 'pilot-status.component.html'
})
export class PilotStatusComponent implements OnInit {

  pilotStats = [
    {
      name: "Pilot1",
      status : "yes",
      date: new Date()
    },
    {
      name: "Pilot2",
      status : "no",
      date: new Date()
    },
    {
      name: "Pilot4",
      status : "no",
      date: new Date()
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  getPilotAvailabilityClass(pilot:any) {
    if (pilot.status === "yes") {
      return "alert alert-success";
    }
  }

}
