import { Component, OnInit } from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";

@Component({
  moduleId: module.id,
  selector: 'app-process-bought',
  templateUrl: 'process-bought.component.html',
  styleUrls: ['process-bought.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class ProcessBoughtComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  acceptOrder() {

  }

}
