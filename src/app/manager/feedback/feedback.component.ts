import {Component, OnInit, provide} from '@angular/core';
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {FeedbackSecuredService} from "../../services/feedback.secured.service";

@Component({
  moduleId: module.id,
  selector: 'feedback',
  templateUrl: 'feedback.component.html',
  providers: [FeedbackSecuredService, provide(AuthConfig, {useValue: new AuthConfig()}), AuthHttp]
})
export class FeedbackComponent implements OnInit {

  constructor(private service:FeedbackSecuredService) { }

  feedbackList:any;

  ngOnInit() {
    this.service.listUnread().subscribe(
      data => this.feedbackList = data.json(),
      err => console.log(err)
    );
  }

  markRead(feedback) {
    this.service.markRead(feedback.id).subscribe(
      data => this.ngOnInit(),
      err => console.log(err)
    );
  }
}
