import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class FeedbackService {

  private baseUrl = environment.ip + "v1/feedback/";

  constructor(private http:Http) {

  }

  public post(feedback:string) {
    return this.http.post(this.baseUrl + "post", feedback);
  }

}
