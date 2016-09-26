import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SsoAuth} from "../services/ssoauth.service";

@Component({
  moduleId: module.id,
  selector: 'app-callback',
  templateUrl: 'callback.component.html',
  styleUrls: ['callback.component.css'],
  providers: [SsoAuth]
})
export class CallbackComponent implements OnInit {

  token:string;
  state:string;

  constructor(private _router:Router, private auth:SsoAuth) {
    _router.routerState.queryParams.subscribe(
      data => {
        this.token = data['code'];
        this.state = data['state'];
      });
  }

  ngOnInit() {

    this.auth.login(this.token).subscribe(
      data => {
        let sessionId = data.json().sessionId;
        localStorage.setItem('session', sessionId);
        this._router.navigateByUrl("/" + this.state);
      },
      err => {
        alert(err);
      }
    )


  }


}
