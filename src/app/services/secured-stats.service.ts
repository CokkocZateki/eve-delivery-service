import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {Http, Headers} from "@angular/http";

@Injectable()
export class SecuredStatsService {

  private baseUrl = environment.ipV2 + "secured/pilot/";

  constructor(private http: Http) {
  }

  auth(): any {
    let session = localStorage.getItem("horde-delivery-session");
    let character = localStorage.getItem("horde-delivery-character");
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(character + ':' + session));
    return {headers: headers};
  }

  getValueRequested(): Promise<number> {
    return this.http.get(this.baseUrl + "sum/requested", this.auth())
      .toPromise()
      .then(response => response.json().sum as number)
      .catch(this.handleError);
  }

  getVolumeRequested(): Promise<number> {
    return this.http.get(this.baseUrl + "volume/pending", this.auth())
      .toPromise()
      .then(response => response.json().volumePending as number)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
