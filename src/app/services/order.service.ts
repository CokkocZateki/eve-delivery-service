import {Injectable} from "@angular/core";
import {Order} from "../common/order";
import {Http} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class OrderService {

  private baseUrl = environment.ipV2 + "order/";

  constructor(private http:Http) {

  }

  public create(model:Order, multiplier:number) {
    return this.http.post(this.baseUrl + "create"  + "?multiplier=" + multiplier, model);
  }

  public quote(praisalLink:string, multiplier:number) {
    return this.http.get(this.baseUrl + "quote?link=" + praisalLink + "&multiplier=" + multiplier);
  }

  public status(orderId:string) {
    return this.http.get(this.baseUrl + "status?id=" + orderId);
  }

  public shippingPrice(praisalLink:string) {
    return this.http.get(this.baseUrl + "shippingprice?link=" + praisalLink);
  }

}
