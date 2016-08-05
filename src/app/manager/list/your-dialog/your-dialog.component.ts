import {Component} from "@angular/core";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'your-dialog',
  templateUrl: 'confirm-dialog.component.html',
  directives: [MODAL_DIRECTIVES, ConfirmDialogComponent]
})
export class YourDialogComponent {

  buttonTitle:string = "Implement me";
  modalTitle:string = "Implement me";

  constructor() { }

  onConfirm(myModal:any) {

    // todo: implement confirmation logic

    myModal.close();
  }

}
