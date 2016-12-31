import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../services/survey.service";

@Component({
  moduleId: module.id,
  selector: 'app-survey',
  templateUrl: 'survey.component.html',
  styleUrls: ['survey.component.css'],
  providers: [SurveyService]
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

  generateUUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
    }
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
