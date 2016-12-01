import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {Http, Headers} from "@angular/http";

@Injectable()
export class UserService {

  private baseUrl = environment.ipV2 + "user/";

  constructor(private http:Http) { }

  auth(): any {
    let session = localStorage.getItem("horde-delivery-session");
    let character = localStorage.getItem("horde-delivery-character");
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(character + ':' + session));
    return {headers: headers};
  }

  public getDetails() {
    return this.http.get(this.baseUrl + "details", this.auth());
  }

}
