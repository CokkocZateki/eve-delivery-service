import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {environment} from "../environment";
import {Order} from "../common/order";

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

  delete(orderId: string) {
    return this.http.post(this.baseUrl + "delete?id=" + orderId, "", this.auth());
  }

  history(): Promise<Order[]> {
    return this.http.get(this.baseUrl + "history", this.auth())
      .toPromise()
      .then(response => response.json() as Order[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
