import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {Http, Headers} from "@angular/http";

@Injectable()
export class SurveyService {

  private baseUrl = environment.ipV2 + "survey/";

  constructor(private http: Http) {
  }

  getRandomQuestion(uuid: string): Promise<string> {
    return this.http.get(this.baseUrl + "?uuid=" + uuid)
      .toPromise()
      .then(response => response.text())
      .catch(this.handleError);
  }

  answer(question: string, answer: string, uuid: string): void {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json');
    let payload = {
      question: question,
      answer: answer,
      uuid: uuid
    };
    this.http.post(this.baseUrl, JSON.stringify(payload), {headers: headers}).subscribe(
      data => {
      },
      err => console.log(err)
    )
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
