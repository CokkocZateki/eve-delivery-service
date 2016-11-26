import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-reorder',
  templateUrl: 'reorder.component.html',
  styleUrls: ['reorder.component.css']
})
export class ReorderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  order(id:string) {
    this.router.navigate(['/frontpage', "Test", "7RM Beanstar", "4878458"]);
  }
}
