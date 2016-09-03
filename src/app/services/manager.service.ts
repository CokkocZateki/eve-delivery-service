import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class ManagerService {

  private baseUrl = environment.ip + "v1/secured/manager/";

  constructor(private http:AuthHttp) {

  }

  public list() {
    return this.http.get(this.baseUrl + "list");
  }

  public getOrder(orderId:string) {
    return this.http.get(this.baseUrl + "load?orderId=" + orderId);
  }

  public updatePrice(orderId:string, price:string) {
    return this.http.post(this.baseUrl + "update/price?id=" + orderId + "&price=" + price, "");
  }

  public updateShippingPrice(orderId:string, shippingPrice:string) {
    return this.http.post(this.baseUrl + "update/shippingPrice?id=" + orderId + "&shippingPrice=" + shippingPrice, "");
  }

  public updateStatus(orderId:string, newStatus:string) {
    return this.http.post(this.baseUrl + "update/status?id=" + orderId + "&newStatus=" + newStatus, "");
  }

  public updateAssignee(orderId:string, assignee:string) {
    return this.http.post(this.baseUrl + "update/assignee?id=" + orderId + "&assignee=" + assignee, "");
  }

  public countRequests() {
    return this.http.get(this.baseUrl + "count/requests");
  }

  public activeShippingContracts() {
    return this.http.get(this.baseUrl + "count/activeShippingContracts");
  }

  waitingForShippingContracts() {
    return this.http.get(this.baseUrl + "count/waitingForShippingContracts");
  }

  ordersReadyForContracting() {
    return this.http.get(this.baseUrl + "count/ordersReadyForContracting");
  }

  hasUnreadMail() {
    return this.http.get(this.baseUrl + "hasUnreadMail");
  }

  volumeShipping() {
    return this.http.get(this.baseUrl + "volume/shipping");
  }

  volumePending() {
    return this.http.get(this.baseUrl + "volume/pending");
  }

  sumRequested() {
    return this.http.get(this.baseUrl + "sum/requested");
  }

  sumConfirmed() {
    return this.http.get(this.baseUrl + "sum/confirmed");
  }

  sumShipping() {
    return this.http.get(this.baseUrl + "sum/shipping");
  }

  delete(id:string) {
    return this.http.post(this.baseUrl + "delete?id=" + id, "");
  }

}
