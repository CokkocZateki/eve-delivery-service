import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ReorderService} from "../../services/reorder.service";

@Component({
  moduleId: module.id,
  selector: 'app-reorder',
  templateUrl: 'reorder.component.html',
  styleUrls: ['reorder.component.css'],
  providers: [ReorderService]
})
export class ReorderComponent implements OnInit {

  constructor(private router: Router, private service: ReorderService) {
  }

  private doctrines: any;
  private own: any;

  @Input() client:string;

  ngOnInit() {
    this.service.doctrine().subscribe(
      data => {
        this.doctrines = data.json();
        console.log(this.doctrines);
      },
      err => console.log(err)
    );

    this.service.own().subscribe(
      data => this.own = data.json(),
      err => console.log(err)
    );
  }

  order(reorder:any) {
    this.router.navigate(['/frontpage', this.client, reorder.destination, reorder.link, '']);
  }

  orderFitted(reorder:any) {
    this.router.navigate(['/frontpage', this.client, reorder.destination, reorder.link, 'prefit']);
  }
}
