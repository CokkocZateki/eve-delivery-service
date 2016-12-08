import { Component, OnInit } from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  moduleId: module.id,
  selector: 'app-info-fitting',
  templateUrl: 'info-fitting.component.html',
  styleUrls: ['info-fitting.component.css'],
  directives: [MODAL_DIRECTIVES]
})
export class InfoFittingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
