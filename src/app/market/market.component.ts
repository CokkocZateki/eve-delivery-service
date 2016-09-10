import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'market',
  templateUrl: 'market.component.html',
  styleUrls: ['market.component.css']
})
export class MarketComponent implements OnInit {

  model:any;

  data = [];

  constructor() { }

  ngOnInit() {
  }

  addItem(value:string) {
    this.data.unshift(value);
    this.model = "";
  }

}
