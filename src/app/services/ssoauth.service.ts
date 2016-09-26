import {Injectable}      from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../environment";


@Injectable()
export class SsoAuth {

  private baseUrl = environment.authIp;

  constructor(private http:Http) {

  }

  public login(token:string) {
    return this.http.post(this.baseUrl + "login", token);
    // this.http.post(this.baseUrl, token).subscribe(
    //   data => {
    //     let session = "123";
    //     localStorage.setItem('session', session);
    //     callback();
    //   },
    //   err => {
    //     errCallback(err);
    //   }
    // )
  };

  public authenticated() {

  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('session');
  };
}
