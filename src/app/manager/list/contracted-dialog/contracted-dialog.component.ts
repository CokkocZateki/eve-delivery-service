import {Component, Input, Output} from "@angular/core";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";
import {ClipboardDirective} from "angular2-clipboard";

@Component({
  selector: 'contracted-dialog',
  templateUrl: 'app/manager/list/contracted-dialog/contracted-dialog.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective]
})
export class ContractedDialogComponent {

  @Input() orderId:string;
  @Input() recipient:string;
  @Input() mail:string;

  @Output() orderContracted = new EventEmitter();

  title = "Delivery Service - Contracted";

  buttonTitle:string = "Contracted";
  modalTitle:string = "Contracted Order";

  constructor() {
  }

  onConfirm(myModal:any) {
    this.orderContracted.emit(null);
    myModal.close();
  }

}
