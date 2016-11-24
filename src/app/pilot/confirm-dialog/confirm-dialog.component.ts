import {Component, Output, OnInit, Input} from "@angular/core";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ClipboardDirective} from "angular2-clipboard";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";
import {SsoAuth} from "../../services/ssoauth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'app/pilot/confirm-dialog/confirm-dialog.component.html',
  directives: [MODAL_DIRECTIVES, ClipboardDirective]
})
export class ConfirmDialogComponent implements OnInit {

  @Output() contracted: EventEmitter<string> = new EventEmitter<string>();

  @Input() orderId:string;
  @Input() buttonTitle:string;

  constructor(private auth:SsoAuth, private router:Router) {
  }

  ngOnInit() {
    this.auth.isAuthorized("pilot").subscribe(
      data => { },
      err => this.router.navigate(['/unauthorized'])
    );

  }

  onConfirm(myModal:any) {
    // confirm all
    myModal.close();
    this.contracted.emit(this.orderId);
  }

}
