import {Component, Input, Output, OnInit} from "@angular/core";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";
import {ClipboardDirective} from "angular2-clipboard";
import {NumberGrouping} from "../../../common/numberGrouping.pipe";

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'app/manager/list/confirm-dialog/confirm-dialog.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective],
  pipes: [NumberGrouping]
})
export class ConfirmDialogComponent {

  @Input() basePrice:number;
  @Input() recipient:string;
  @Input() mail:string;
  @Input() disableButton:boolean;

  @Output() orderConfirmed = new EventEmitter();

  title = "Delivery Service - Confirmed";

  buttonTitle:string = "Confirm";
  modalTitle:string = "Confirm Order";

  constructor() {
  }

  onConfirm(myModal:any) {
    this.orderConfirmed.emit(null);
    myModal.close();
  }

}
