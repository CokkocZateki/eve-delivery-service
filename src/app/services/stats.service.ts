import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class StatsService {

  private baseUrl = environment.ip + "v1/stats/";

  constructor(private http:Http) { }

  requested() {
    return this.http.get(this.baseUrl + "count/requested");
  }
  processing() {
    return this.http.get(this.baseUrl + "count/processing");
  }
  completed() {
    return this.http.get(this.baseUrl + "count/completed");
  }
  averageTime() {
    return this.http.get(this.baseUrl + "averageTime");
  }

}
