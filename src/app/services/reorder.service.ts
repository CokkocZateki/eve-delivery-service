import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class ReorderService {

  private baseUrl = environment.ipV2 + "secured/client/reorder/";

  constructor(private http:Http) { }

  auth(): any {
    let session = localStorage.getItem("horde-delivery-session");
    let character = localStorage.getItem("horde-delivery-character");
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(character + ':' + session));
    return {headers: headers};
  }

  public doctrine() {
    return this.http.get(this.baseUrl + "doctrine", this.auth());
  }

  public own() {
    return this.http.get(this.baseUrl + "own", this.auth());
  }

}
