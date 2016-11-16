import { Component, OnInit } from '@angular/core';
import {Order} from "../../common/order";

@Component({
  moduleId: module.id,
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.css']
})
export class HistoryComponent implements OnInit {

  private orders: Order[];

  constructor() { }

  ngOnInit() {
  }

}
