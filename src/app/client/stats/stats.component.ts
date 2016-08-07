import {Component, OnInit} from '@angular/core';
import {StatsService} from "../../services/stats.service";

@Component({
  selector: 'stats',
  templateUrl: './app/client/stats/stats.component.html',
  providers: [StatsService]
})
export class StatsComponent implements OnInit {


  requestCount:number;
  processingCount:number;
  completedCount:number;
  averageHours:number;

  failed:boolean;

  constructor(private service:StatsService) {
  }


  ngOnInit() {
    this.service.requested().subscribe(
      data => this.requestCount = data.json().requested,
      err => {
        console.log(err);
        this.failed = true;
      }
    );

    this.service.processing().subscribe(
      data => this.processingCount = data.json().processing,
      err => {
        console.log(err);
        this.failed = true;
      }
    );

    this.service.completed().subscribe(
      data => this.completedCount = data.json().completed,
      err => {
        console.log(err);
        this.failed = true;
      }
    );

    this.service.averageTime().subscribe(
      data => this.averageHours = data.json().averageTime,
      err => {
        console.log(err);
        this.failed = true;
      }
    );
  }

}
