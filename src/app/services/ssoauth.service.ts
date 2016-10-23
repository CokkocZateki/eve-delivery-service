import {Injectable}      from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {environment} from "../environment";
import {Router} from "@angular/router";


@Injectable()
export class SsoAuth {

  private baseUrl = "https://localhost:8443/session/";
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

  public login(token: string, state:string) {
    let headers = new Headers();
    this.http.post(this.baseUrl + "create?code=" + token, "", {headers: headers}).subscribe(
      data => {
        var session = data.json().session;
        localStorage.setItem("horde-delivery-session", session);
        this._router.navigate(['/' + state]);
      },
      err => {
        localStorage.removeItem('horde-delivery-session');
      }
    );
  };

  public authenticated() {
    return this.isAuthenticated;
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('horde-delivery-session');

    // todo: delete session in backend

    this._router.navigate(['/']);
  };
}
