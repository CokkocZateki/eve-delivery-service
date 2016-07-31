import {Component} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {Order} from "../../common/order";

@Component({
  selector: 'order',
  providers: [OrderService],
  templateUrl: './app/client/order/order.html',
  pipes: [NumberGrouping]
})
export class OrderComponent {
  private expectedPrice:number;
  private isPriceCalculationFailed = false;

  public constructor(private orderService:OrderService) {

  }

  public model = new Order(null, null, null, null);

  public isCollapsed:boolean = true;
  public isPriceCalculated:boolean = false;
  public isPriceCalculationRunning:boolean = false;

  public submitted:boolean = false;
  public orderId:string;

  public onSubmit() {

    this.model.expectedPrice = this.expectedPrice;

    this.orderService.create(this.model).subscribe(
      data => {
        // todo: can we migrate the .json call into a .map(res => res.json() call in the service?
        let body = data.json();
        // if everything is ok
        this.submitted = true;
        this.orderId = body.id;
      },
      err => {
        console.log(err);
        // todo: show frontend error message
      }
    );
  }

  public onKey(event:any) {
    this.isPriceCalculated = false;

    let link = event.target.value;
    let needle = "evepraisal.com/e/";
    let orderId:number;

    if (link.indexOf(needle) > -1) {
      orderId = link.split(needle)[1];
    }

    if (orderId !== undefined) {
      this.isPriceCalculationRunning = true;
      this.calculatePrice(link);
    }
  }

  private calculatePrice(praisalLInk:string){
    this.isPriceCalculationFailed = false;

    this.orderService.quote(praisalLInk).subscribe(
      data => {
        let body = data.json();
        this.expectedPrice = body.price;
        this.isPriceCalculationRunning = false;
        this.isPriceCalculated = true;
      },
      err => {
        this.isPriceCalculationRunning = false;
        this.isPriceCalculated = false;
        this.isPriceCalculationFailed = true;
        console.log(err);
      }
    );
  }
}
