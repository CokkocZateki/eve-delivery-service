import {Component, Output, OnInit} from "@angular/core";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";
import {Router} from "@angular/router";
import {SsoAuth} from "../../../services/ssoauth.service";

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'app/client/queue/confirm-dialog/confirm-dialog.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective]
})
export class ConfirmDialogComponent implements OnInit {

  @Output() deleted = new EventEmitter();

  constructor(private auth:SsoAuth, private router:Router) {
  }

  ngOnInit() {
  }

  onConfirm(myModal:any) {
    // confirm all
    this.deleted.emit(null);
    myModal.close();
  }

}
