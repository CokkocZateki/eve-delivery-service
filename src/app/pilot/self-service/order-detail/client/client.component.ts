import {Component, OnInit, Input} from '@angular/core';
import {Order} from "../../../../common/order";
import {ClipboardDirective} from "angular2-clipboard";

@Component({
  moduleId: module.id,
  selector: 'app-client',
  templateUrl: 'client.component.html',
  styleUrls: ['client.component.css'],
  directives: [ClipboardDirective]
})
export class ClientComponent implements OnInit {

  @Input() order:Order;

  constructor() { }

  ngOnInit() {
  }

}
