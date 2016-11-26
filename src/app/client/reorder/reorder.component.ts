import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ReorderService} from "../../services/reorder.service";

@Component({
  moduleId: module.id,
  selector: 'app-reorder',
  templateUrl: 'reorder.component.html',
  styleUrls: ['reorder.component.css']
})
export class ReorderComponent implements OnInit {

  constructor(private router:Router, private service:ReorderService) { }

  private doctrines:any;
  private own:any;

  ngOnInit() {
    this.service.doctrine().subscribe(
      data => this.doctrines = data.json(),
      err => console.log(err)
    );

    this.service.own().subscribe(
      data => this.own = data.json(),
      err => console.log(err)
    );
  }

  order(id:string) {
    this.router.navigate(['/frontpage', "Test", "7RM Beanstar", "4878458"]);
  }
}
