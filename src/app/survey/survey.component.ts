import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-survey',
  templateUrl: 'survey.component.html',
  styleUrls: ['survey.component.css']
})
export class SurveyComponent implements OnInit {

  question = "Are you happy with the recent delivery times?";

  constructor() { }

  ngOnInit() {
  }

}
