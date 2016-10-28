import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {Http, Headers} from "@angular/http";

@Injectable()
export class PilotService {

  private baseUrl = environment.ipV2 + "secured/pilot/";

  constructor(private http:Http) { }

  auth(): any {
    let session = localStorage.getItem("horde-delivery-session");
    let character = localStorage.getItem("horde-delivery-character");
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(character + ':' + session));
    return {headers: headers};
  }

  listShippingOrders() {
    return this.http.get(this.baseUrl + "list/shipping", this.auth());
  }

  public getDetails() {
    return this.http.get(this.baseUrl + "details", this.auth());
  }

  public updateStatus(orderId: string, newStatus: string) {
    return this.http.post(this.baseUrl + "update/status?id=" + orderId + "&newStatus=" + newStatus, "", this.auth());
  }

  public updateAvailability(canShip:boolean) {
    return this.http.post(this.baseUrl + "availability?canShip=" + canShip, "", this.auth());
  }

  public getAvailability() {
    return this.http.get(this.baseUrl + "availability", this.auth());
  }

  public getAvailabilityAll() {
    return this.http.get(this.baseUrl + "availability/all", this.auth());
  }

}
