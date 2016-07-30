import {Injectable} from "@angular/core";
import {Order} from "../common/order";
import {Http} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class OrderService {

  private baseUrl = environment.ip + "v1/order/";

  constructor(private http:Http) {

  }

  public create(model:Order) {
    return this.http.post(this.baseUrl + "create", model);
  }

  public quote(praisalLink:string) {
    return this.http.get(this.baseUrl + "quote?link=" + praisalLink);
  }

  public status(orderId:string) {
    return this.http.get(this.baseUrl + "status?id=" + orderId);
  }

}
