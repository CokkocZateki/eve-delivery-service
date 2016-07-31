import {Component} from '@angular/core';
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'status',
  providers: [OrderService],
  templateUrl: './app/client/status/status.html',
})
export class StatusComponent {

  public showStatusForm:boolean;

  public constructor(private orderService:OrderService) {
  }

  public status:string;

  public onKey(event:any) {
    this.status = "Requesting status ...";

    let orderId = event.target.value;

    this.orderService.status(orderId).subscribe(
      data => {
        let body = data.json();
        if (body.status != null) {
          let statusName = body.status;
          if (statusName === 'requested') {
            this.status = "We received your order and will check in with you soon.";
          } else if (statusName === 'rejected') {
            this.status = "Your order was rejected. Please check your eve mails for further details.";
          } else if (statusName === 'confirmed') {
            this.status = "Your order was confirmed and will be shipped soon! ";
          } else if (statusName === 'shipping') {
            this.status = "Your items are doing a space trip and will be with you soon!";
          } else if (statusName === 'contracted') {
            this.status = "There is a contract waiting for you :) Your order has been contracted. Thank you for using " +
              "the Horde Supermarket and see you again soon!";
          }

          else {
            this.status = body.status;
          }
        } else {
          this.status = "The order could not be found.";
        }
      },
      err => {
        this.status = "An error occurred. Please report this error with your id to your agent.";
        console.log(err);
      }
    );
  }
}
