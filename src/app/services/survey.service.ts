import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {Http} from "@angular/http";

@Injectable()
export class SurveyService {

  private baseUrl = environment.ipV2 + "survey/";

  constructor(private http: Http) {
  }

  getRandomQuestion(uuid:string): Promise<string> {
    return this.http.get(this.baseUrl + "?uuid=" + uuid)
      .toPromise()
      .then(response => response.text())
      .catch(this.handleError);
  }

  answer(question: string, answer: string): void {
    this.http.post(this.baseUrl, "").subscribe(
      data => {},
      err => console.log(err)
    )
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
