import { Component, OnInit } from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";

@Component({
  moduleId: module.id,
  selector: 'app-pick',
  templateUrl: 'pick.component.html',
  styleUrls: ['pick.component.css'],
  directives: [ClipboardDirective, MODAL_DIRECTIVES]
})
export class PickComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
