import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class ManagerService {

  private baseUrl = environment.ip + "v1/secured/manage/";

  constructor(private http:Http) {

  }

  public list() {
    return this.http.get(this.baseUrl + "list");
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
}
