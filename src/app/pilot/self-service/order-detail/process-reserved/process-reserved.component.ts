import {Component, OnInit, Output} from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";

@Component({
  moduleId: module.id,
  selector: 'app-process-reserved',
  templateUrl: 'process-reserved.component.html',
  styleUrls: ['process-reserved.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class ProcessReservedComponent implements OnInit {

  @Output() reserved: EventEmitter<string> = new EventEmitter<string>();

  buttonTitle = "Reserve order";

  constructor() { }

  ngOnInit() {
  }

  reserveOrder() {
    this.buttonTitle += " ...";
    this.reserved.emit(null);
  }
}
