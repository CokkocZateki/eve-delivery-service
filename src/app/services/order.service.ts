import {Injectable} from "@angular/core";
import {Order} from "../common/order";
import {Http} from "@angular/http";

@Injectable()
export class OrderService {

  private baseUrl = "http://localhost:4000/v1/order/";

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
