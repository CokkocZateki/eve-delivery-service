import {Component, OnInit, Output} from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";

@Component({
  moduleId: module.id,
  selector: 'app-process-skip',
  templateUrl: 'process-skip.component.html',
  styleUrls: ['process-skip.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class ProcessSkipComponent implements OnInit {

  @Output() skip: EventEmitter<string> = new EventEmitter<string>();

  buttonTitle = "Skip order";

  constructor() { }

  ngOnInit() {
  }

  skipOrder() {
    this.buttonTitle += " ...";
    this.skip.emit(null);
  }

}
