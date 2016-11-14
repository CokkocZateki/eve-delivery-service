import {Component, OnInit, Output} from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";

@Component({
  moduleId: module.id,
  selector: 'app-pick',
  templateUrl: 'pick.component.html',
  styleUrls: ['pick.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class PickComponent implements OnInit {

  @Output() pick: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  emitPick() {
    this.pick.emit(null);
  }

}
