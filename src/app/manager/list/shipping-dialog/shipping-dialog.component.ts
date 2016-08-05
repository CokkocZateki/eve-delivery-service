import {Component, Input, Output} from "@angular/core";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import EventEmitter = webdriver.EventEmitter;

@Component({
  selector: 'shipping-dialog',
  templateUrl: 'shipping-dialog.component.html',
  directives: [MODAL_DIRECTIVES, ConfirmDialogComponent]
})
export class ShippingDialogComponent {

  @Input() orderId:string;
  @Input() collateral:number;
  @Input() reward:number;

  @Output() orderShipped = new EventEmitter();

  buttonTitle:string = "Ship Me";
  modalTitle:string = "Shipping";

  constructor() { }

  onConfirm(myModal:any) {
    this.orderShipped.emit(this.orderId);
    myModal.close();
  }

}
