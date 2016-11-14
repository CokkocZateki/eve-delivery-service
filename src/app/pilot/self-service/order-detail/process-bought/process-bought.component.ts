import {Component, OnInit, Output} from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";

@Component({
  moduleId: module.id,
  selector: 'app-process-bought',
  templateUrl: 'process-bought.component.html',
  styleUrls: ['process-bought.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class ProcessBoughtComponent implements OnInit {

  @Output() bought: EventEmitter<string> = new EventEmitter<string>();

  buttonTitle = "Items bought";

  constructor() { }

  ngOnInit() {
  }

  acceptOrder() {
    this.buttonTitle += " ...";
    this.bought.emit(null);
  }

}
