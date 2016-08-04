import {Component, Input} from "@angular/core";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {Order} from "../../../common/order";

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'app/manager/list/confirm-dialog/confirm-dialog.component.html',
  directives: [MODAL_DIRECTIVES]
})
export class ConfirmDialogComponent {

  @Input() order:Order;

  buttonTitle:string = "Confirm";
  modalTitle:string = "Confirm Order";

  constructor() { }

  onConfirm(myModal:any) {

    // todo: implement confirmation logic

    myModal.close();
  }

}
