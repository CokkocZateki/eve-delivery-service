import {Component, Output} from "@angular/core";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'app/pilot/confirm-dialog/confirm-dialog.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective]
})
export class ConfirmDialogComponent {

  @Output() contractedAll = new EventEmitter();

  constructor() {
  }

  onConfirm(myModal:any) {
    // confirm all
    this.contractedAll.emit(null);
    myModal.close();
  }

}
