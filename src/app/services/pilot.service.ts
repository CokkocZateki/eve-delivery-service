import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class PilotService {

  private baseUrl = environment.ip + "v1/secured/pilot/";

  constructor(private authHttp:AuthHttp) {

  }

  public updateAvailability(canShip:boolean) {
    return this.authHttp.post(this.baseUrl + "availability?canShip=" + canShip, "");
  }

  public getAvailability() {
    return this.authHttp.get(this.baseUrl + "availability");
  }

  public getAvailabilityAll() {
    return this.authHttp.get(this.baseUrl + "availability/all");
  }

}
