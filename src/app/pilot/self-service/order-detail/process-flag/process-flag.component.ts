import { Component, OnInit } from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";

@Component({
  moduleId: module.id,
  selector: 'app-process-flag',
  templateUrl: 'process-flag.component.html',
  styleUrls: ['process-flag.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class ProcessFlagComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  flagOrder() {

  }
}
