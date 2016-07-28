import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class FeedbackService {

  private baseUrl = "http://localhost:4000/v1/feedback/";

  constructor(private http:Http) {

  }

  public post(feedback:string) {
    return this.http.post(this.baseUrl + "post", feedback);
  }

}
