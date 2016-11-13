import {Component, OnInit, Input} from '@angular/core';
import {Order} from "../../../../common/order";
import {ClipboardDirective} from "angular2-clipboard";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  moduleId: module.id,
  selector: 'app-client',
  templateUrl: 'client.component.html',
  styleUrls: ['client.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class ClientComponent implements OnInit {

  @Input() order:Order;

  constructor() { }

  ngOnInit() {
  }

}
