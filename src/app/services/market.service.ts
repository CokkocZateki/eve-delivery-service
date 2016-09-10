import {Injectable} from "@angular/core";
import {Order} from "../common/order";
import {Http} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class MarketService {

  private baseUrl = environment.ip + "v1/market/";

  constructor(private http:Http) {

  }

  public add(item:string) {
    return this.http.post(this.baseUrl + "add", item);
  }

  public list() {
    return this.http.get(this.baseUrl + "list");
  }

}
