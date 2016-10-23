import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {Http, Headers} from "@angular/http";

@Injectable()
export class ManagerService {

  private baseUrl = environment.ipV2 + "/secured/manager/";

  constructor(private http: Http) {

  }

  auth(): any {
    let session = localStorage.getItem("horde-delivery-session");
    let character = localStorage.getItem("horde-delivery-character");
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(character + ':' + session));
    return {headers: headers};
  }

  public list() {
    return this.http.get(this.baseUrl + "list", this.auth());
  }

  public getOrder(orderId: string) {
    return this.http.get(this.baseUrl + "load?orderId=" + orderId, this.auth());
  }

  public updatePrice(orderId: string, price: string) {
    return this.http.post(this.baseUrl + "update/price?id=" + orderId + "&price=" + price, "", this.auth());
  }

  public updateShippingPrice(orderId: string, shippingPrice: string) {
    return this.http.post(this.baseUrl + "update/shippingPrice?id=" + orderId + "&shippingPrice=" + shippingPrice, "");
  }

  public updateStatus(orderId: string, newStatus: string) {
    return this.http.post(this.baseUrl + "update/status?id=" + orderId + "&newStatus=" + newStatus, "", this.auth());
  }

  public updateAssignee(orderId: string, assignee: string) {
    return this.http.post(this.baseUrl + "update/assignee?id=" + orderId + "&assignee=" + assignee, "", this.auth());
  }

  volumeShipping() {
    return this.http.get(this.baseUrl + "volume/shipping", this.auth());
  }

  volumePending() {
    return this.http.get(this.baseUrl + "volume/pending", this.auth());
  }

  sumRequested() {
    return this.http.get(this.baseUrl + "sum/requested", this.auth());
  }

  sumConfirmed() {
    return this.http.get(this.baseUrl + "sum/confirmed", this.auth());
  }

  sumShipping() {
    return this.http.get(this.baseUrl + "sum/shipping", this.auth());
  }

  delete(id: string) {
    return this.http.post(this.baseUrl + "delete?id=" + id, "", this.auth());
  }

}
