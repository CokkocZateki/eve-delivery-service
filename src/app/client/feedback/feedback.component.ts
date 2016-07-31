import {Component} from '@angular/core';
import {FeedbackService} from "../../services/feedback.service";


@Component({
  selector: 'feedback',
  providers: [FeedbackService],
  templateUrl: './app/client/feedback/feedback.html'
})
export class FeedbackComponent {

  public feedback:string;
  public feedbackSubmitted:boolean;
  public feedbackFailed:boolean;
  public showFeedbackForm:boolean;

  public constructor(private feedbackService:FeedbackService) {}

  public onSubmit() {
    this.feedbackService.post(this.feedback).subscribe(
      data => this.feedbackSubmitted = true,
      err => this.feedbackFailed = true
    );
  }

}
