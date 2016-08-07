import {Component, Input, Output} from "@angular/core";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";
import {ClipboardDirective} from "angular2-clipboard";
import {NumberGrouping} from "../../../common/numberGrouping.pipe";

@Component({
  selector: 'shipping-dialog',
  templateUrl: 'app/manager/list/shipping-dialog/shipping-dialog.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective],
  pipes: [NumberGrouping]
})
export class ShippingDialogComponent {

  // @Input() collateral:number;
  // @Input() reward:number;
  @Input() exchangePrice:number;
  @Input() exchangeDescription:string;
  @Input() basePrice:number;

  @Output() orderIsShipping = new EventEmitter();

  buttonTitle:string = "Ship Me";
  modalTitle:string = "Shipping";

  constructor() { }

  onConfirm(myModal:any) {
    this.orderIsShipping.emit(null);
    myModal.close();
  }

}
