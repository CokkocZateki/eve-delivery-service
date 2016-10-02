import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class FeedbackSecuredService {

  private securedBaseUrl = environment.ip + "v1/secured/feedback/";

  constructor(private authHttp:AuthHttp) { }

  public listUnread() {
    return this.authHttp.get(this.securedBaseUrl + "list/unread");
  }

  public markRead(feedbackId:string) {
    return this.authHttp.post(this.securedBaseUrl + "mark/read?feedbackId=" + feedbackId, "");
  }

}
