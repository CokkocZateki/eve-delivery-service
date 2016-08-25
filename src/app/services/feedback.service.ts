import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../environment";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class FeedbackService {

  private baseUrl = environment.ip + "v1/feedback/";
  private securedBaseUrl = environment.ip + "v1/secured/feedback/";

  constructor(private http:Http, private authHttp:AuthHttp) { }

  public post(feedback:string) {
    return this.http.post(this.baseUrl + "post", feedback);
  }

  public listUnread() {
    return this.authHttp.get(this.securedBaseUrl + "list/unread");
  }

  public markRead(feedbackId:string) {
    return this.authHttp.post(this.securedBaseUrl + "mark/read?feedbackId=" + feedbackId, "");
  }

}
