import { Component, OnInit } from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";

@Component({
  moduleId: module.id,
  selector: 'app-process-skip',
  templateUrl: 'process-skip.component.html',
  styleUrls: ['process-skip.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class ProcessSkipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  skipOrder() {

  }

}
