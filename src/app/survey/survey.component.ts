import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-survey',
  templateUrl: 'survey.component.html',
  styleUrls: ['survey.component.css']
})
export class SurveyComponent implements OnInit {

  question = "Are you happy with the recent delivery times?";
  answered = false;

  constructor() { }

  ngOnInit() {
  }

  answerWith(answer:string): void {
    console.log(answer);
    this.answered = true;
  }
}
