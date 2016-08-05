import {Component, Input, Output} from "@angular/core";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";
import {ClipboardDirective} from "angular2-clipboard";

@Component({
  selector: 'reject-dialog',
  templateUrl: 'app/manager/list/rejected-dialog/rejected-dialog-old.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective]
})
export class RejectDialogComponent {

  @Input() orderId:string;
  @Input() recipient:string;
  @Input() mail:string;

  @Output() orderRejected = new EventEmitter();

  title = "Delivery Service - Rejected";

  buttonTitle:string = "Reject";
  modalTitle:string = "Reject Order";

  constructor() {
  }

  onConfirm(myModal:any) {
    this.orderRejected.emit(this.orderId);
    myModal.close();
  }

}
