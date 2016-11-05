import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class ClientService {

  private baseUrl = environment.ipV2 + "secured/client/";

  constructor(private http:Http) { }

  auth(): any {
    let session = localStorage.getItem("horde-delivery-session");
    let character = localStorage.getItem("horde-delivery-character");
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(character + ':' + session));
    return {headers: headers};
  }

  public name() {
    return this.http.get(this.baseUrl + "details", this.auth());
  }

  public queue() {
    return this.http.get(this.baseUrl + "queue", this.auth());
  }

}