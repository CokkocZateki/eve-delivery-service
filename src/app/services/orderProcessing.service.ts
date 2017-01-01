import {Injectable} from "@angular/core";
import {Order} from "../common/order";
import {NumberGrouping} from "../common/numberGrouping.pipe";
import {ManagerService} from "./manager.service";

@Injectable()
export class OrderProcessingService {

  private targetSystem = "7RM";
  private margin = "13%";

  public constructor(private managerService:ManagerService) { }

  public onStatusChange(id:string, newStatus:string, orders:Array<Order>):Array<Order> {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === id) {
        orders[i].status = "Updating ...";
      }
    }
    this.managerService.updateStatus(id, newStatus).subscribe(
      data => {
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].id === id) {
            orders[i].status = newStatus;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
    return orders;
  }

  public getRecipients(order:Order):string {
    return order.client;
  }

  public getTitle(status:string) {
    if (status === 'confirmed') {
      return "Delivery Service - Confirmed";
    } else if (status === 'contracted') {
      return "Delivery Service - Contracted"
    }
  }

  public generateMail(status:string, order:Order):string {
    let result = "Hi " + order.client + "!<br><br>";

    let margin = this.margin;
    if (order.destination === 'Capital Staging') {
      margin = "10%";
    }

    if (status === 'confirmed') {
      result += "Thank you for your order (" + order.link + "). With a " + margin + " delivery fee " +
        "to the " + order.destination + " it will cost " + new NumberGrouping().transform(order.expectedPrice) + ".00 ISK. " +
        "Shipping will start soon!";
    } else if (status === 'contracted') {
      result += "Your order (" + order.link + ") has been contracted to you and costs "
        + new NumberGrouping().transform(order.expectedPrice) + ".00 ISK. Let us know when you need more!<br/><br/>" +
        "We appreciate it if you recommend us to your " +
        "friends and leave us a message at the forums: " +
        "https://www.pandemic-legion.pl/forums/index.php?/topic/3184-new-delivery-service/";
    }

    result += "<br><br>Your Horde Delivery Service";
    result += "<br><br>Check the status of your order by logging in at http://hordedelivery.com";

    return result;
  }

  public getExchangeDescription(order:Order) {
    let client = order.client;
    let price = order.expectedPrice;
    return client + "@" + order.destination + ": " + new NumberGrouping().transform(price) + " ISK";
  }

}
