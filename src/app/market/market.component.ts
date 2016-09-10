import {Component, OnInit} from '@angular/core';
import {MarketService} from "../services/market.service";
import {MarketItem} from "../common/marketItem";
import {LocalDateTimeToDate} from "../common/localDateTimeToDate";

@Component({
  moduleId: module.id,
  selector: 'market',
  templateUrl: 'market.component.html',
  styleUrls: ['market.component.css'],
  providers: [MarketService],
  pipes: [LocalDateTimeToDate]
})
export class MarketComponent implements OnInit {

  model:MarketItem = new MarketItem(null, null, null);

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

  addItem() {
    this.service.add(this.model).subscribe(
      data => {
        this.data.unshift(this.model);
        this.model = new MarketItem(null, null, null);
      },
      err => alert(err)
    )
  }

}
