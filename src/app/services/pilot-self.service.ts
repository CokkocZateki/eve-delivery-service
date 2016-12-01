import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {Http, Headers} from "@angular/http";
import {Order} from "../common/order";

@Injectable()
export class PilotSelfService {

  private baseUrl = environment.ipV2 + "secured/pilot/selfservice/";

  constructor(private http: Http) {
  }

  auth(): any {
    let session = localStorage.getItem("horde-delivery-session");
    let character = localStorage.getItem("horde-delivery-character");
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(character + ':' + session));
    return {headers: headers};
  }

  getRequestedOrders(): Promise<Order[]> {
    return this.http.get(this.baseUrl + "list/requested", this.auth())
      .toPromise()
      .then(response => response.json() as Order[])
      .catch(this.handleError);
  }

  pick(orderId:string): Promise<Order> {
    return this.http.post(this.baseUrl + "pick?orderId=" + orderId, "", this.auth())
      .toPromise()
      .then(response => response.json() as Order)
      .catch(this.handleError);
  }

  skip(orderId:string): Promise<void> {
    return this.http.post(this.baseUrl + "skip?orderId=" + orderId, "", this.auth())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  bought(orderId:string): Promise<void> {
    return this.http.post(this.baseUrl + "bought?orderId=" + orderId, "", this.auth())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  flag(orderId:string, reason:string): Promise<void> {
    return this.http.post(this.baseUrl + "flag?orderId=" + orderId + "&reason=" + reason, "", this.auth())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
