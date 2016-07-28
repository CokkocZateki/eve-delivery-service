import {Component} from '@angular/core';
import {FeedbackService} from "../services/feedback.service";


@Component({
  selector: 'feedback',
  providers: [FeedbackService],
  templateUrl: './app/feedback/feedback.html'
})
export class FeedbackComponent {

  public feedback:string;
  public feedbackSubmitted:boolean;
  public feedbackFailed:boolean;

  public constructor(private feedbackService:FeedbackService) {}

  public onSubmit() {
    console.log(this.feedback);
    this.feedbackService.post(this.feedback).subscribe(
      data => this.feedbackSubmitted = true,
      err => this.feedbackFailed = true
    );
  }

}
