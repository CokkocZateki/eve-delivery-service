import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {Http, Headers} from "@angular/http";
import {Order} from "../common/order";

@Injectable()
export class PilotSelfService {

  ORDERS = [
    {
      "client": "Tavia Oceans",
      "link": "http://evepraisal.com/e/13531589",
      "expectedPrice": 78647996,
      "destination": "7RM Beanstar",
      "id": "5824f7b62ab79c00059a5f4a",
      "status": "shipping",
      "items": [{"name": "Crow", "quantity": 3, "volume": 2500, "price": 23199999}],
      "setPrice": null,
      "created": {
        "hour": 22,
        "minute": 41,
        "nano": 152000000,
        "second": 58,
        "month": "NOVEMBER",
        "year": 2016,
        "dayOfMonth": 10,
        "dayOfWeek": "THURSDAY",
        "dayOfYear": 315,
        "monthValue": 11,
        "chronology": {"id": "ISO", "calendarType": "iso8601"}
      },
      "completed": null,
      "shippingPrice": null,
      "assignee": null
    }
  ];

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

  getRequestedOrders(): Promise<Order[]> {
    return Promise.resolve(this.ORDERS);
    // return null;
  }

  pick(orderId:string): Promise<Order> {
    console.log(orderId);
    return Promise.resolve(this.ORDERS[0]);
  }
}