import {Injectable} from "@angular/core";
import {Order} from "../common/order";
import {Http, RequestOptions, Headers} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class RaffleService {

  private baseUrl = environment.ip + "v1/raffle/";

  constructor(private http:Http) { }

  post(entry:any) {
    let payload = {
      name: entry.name,
      option: entry.option
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + "add", payload, options);
  }

}
