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
