import {Injectable}      from '@angular/core';
import {Http, Headers} from "@angular/http";
import {environment} from "../environment";
import {Router} from "@angular/router";


@Injectable()
export class SsoAuth {

  private baseUrl = environment.ipAuth + "session/";
  private isAuthenticated:boolean;

  constructor(private http: Http, private _router:Router) {
    let session = localStorage.getItem("horde-delivery-session");
    if (session == null || session == undefined) {
      this.isAuthenticated = false;
    }
    this.http.get(this.baseUrl + "authenticated?sessionId=" + session).subscribe(
      data => {
        var isValid = data.json().isValid;
        this.isAuthenticated = isValid === 'true';
      },
      err => {
        localStorage.removeItem('horde-delivery-session');
        this.isAuthenticated = false;
      }
    );
  }

  public isAuthorized(role:string) {
    let session = localStorage.getItem("horde-delivery-session");
    return this.http.get(this.baseUrl + "authorized?sessionId=" + session + "&role=" + role);
  }

  public login(token: string, state:string) {
    let headers = new Headers();
    this.http.post(this.baseUrl + "create?code=" + token, "", {headers: headers}).subscribe(
      data => {
        var session = data.json().session;
        var character = data.json().character;
        localStorage.setItem("horde-delivery-session", session);
        localStorage.setItem("horde-delivery-character", character);

        this._router.navigate(['/' + state]);
      },
      err => {
        localStorage.removeItem('horde-delivery-session');
        localStorage.removeItem("horde-delivery-character");
      }
    );
  };

  public authenticated() {
    return this.isAuthenticated;
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('horde-delivery-session');
    localStorage.removeItem("horde-delivery-character");
    this.isAuthenticated = false;

    // todo: delete session in backend

    // no routing, because it wouldn't reload the frontpage
    window.location.href = 'http://hordedelivery.com';
  };
}
