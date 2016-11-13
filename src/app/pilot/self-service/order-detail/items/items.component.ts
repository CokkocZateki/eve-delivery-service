import {Component, OnInit, Input} from '@angular/core';
import {Order} from "../../../../common/order";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";

@Component({
  moduleId: module.id,
  selector: 'app-items',
  templateUrl: 'items.component.html',
  styleUrls: ['items.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class ItemsComponent implements OnInit {

  @Input() order:Order;

  constructor() { }

  ngOnInit() {
  }

  listItems(order: Order): string {
    let result = "";
    let items = order.items;

    for (let i = 0; i < items.length; i++) {
      result += items[i].name + " x" + items[i].quantity + "<br>";
    }

    return result;
  }
}
