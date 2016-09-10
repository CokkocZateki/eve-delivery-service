import {Component, OnInit} from '@angular/core';
import {MarketService} from "../services/market.service";

@Component({
  moduleId: module.id,
  selector: 'market',
  templateUrl: 'market.component.html',
  styleUrls: ['market.component.css'],
  providers: [MarketService]
})
export class MarketComponent implements OnInit {

  model:any;

  data = [];

  constructor(private service:MarketService) {
  }

  ngOnInit() {
    this.service.list().subscribe(
      data => {
        console.log(data.json());
        this.data = data.json();
      },
      err => alert(err)
    )
  }

  addItem(value:string) {
    var item = {
      name: value
    };
    this.data.unshift(item);
    this.model = "";
    this.service.add(value).subscribe(
      data => {
      },
      err => alert(err)
    )
  }

}
