import {Component, OnInit, Output} from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";

@Component({
  moduleId: module.id,
  selector: 'app-process-flag',
  templateUrl: 'process-flag.component.html',
  styleUrls: ['process-flag.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class ProcessFlagComponent implements OnInit {

  @Output() flag: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  flagOrder() {
    this.flag.emit(null);
  }
}
