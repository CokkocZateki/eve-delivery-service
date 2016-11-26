import {Component} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {Order} from "../../common/order";
import {DestinationComponent} from "./destination/destination.component";
import {ClipboardDirective} from "angular2-clipboard";
import {Router} from "@angular/router";

@Component({
  selector: 'order',
  providers: [OrderService],
  templateUrl: './app/frontpage/order/order.html',
  directives: [DestinationComponent, ClipboardDirective],
  pipes: [NumberGrouping]
})
export class OrderComponent {
  private expectedPrice: number;
  private isPriceCalculationFailed = false;

  public constructor(private orderService: OrderService, private router: Router) {

  }

  public model = new Order(null, null, null, "7RM Beanstar", null);

  public isPriceCalculated: boolean = false;
  public isPriceCalculationRunning: boolean = false;

  public submitted: boolean = false;
  public isSubmitting: boolean = false;
  public orderId: string;
  public multiplier: number = 1;

  public setDestination(destination: string) {
    this.model.destination = destination;
  }

  public onSubmit() {

    this.isSubmitting = true;

    this.model.expectedPrice = this.expectedPrice;

    this.orderService.create(this.model, this.multiplier).subscribe(
      data => {
        // todo: can we migrate the .json call into a .map(res => res.json() call in the service?
        let body = data.json();
        // if everything is ok
        this.submitted = true;
        this.isSubmitting = false;
        this.orderId = body.id;
      },
      err => {
        console.log(err);
        // todo: show frontend error message
      }
    );
  }

  public askQuote(link: string) {
    this.isPriceCalculated = false;

    let needle = "evepraisal.com/e/";
    let orderId: number;

    if (link.indexOf(needle) > -1) {
      orderId = Number(link.split(needle)[1]);
    }

    if (orderId !== undefined) {
      this.isPriceCalculationRunning = true;
      this.calculatePrice(link);
    }
  }

  private calculatePrice(praisalLInk: string) {
    this.isPriceCalculationFailed = false;

    this.orderService.quote(praisalLInk, this.multiplier).subscribe(
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

  showOrderPage() {
    this.model = new Order(this.model.client, null, null, this.model.destination, null);
    this.submitted = false;
    this.expectedPrice = null;
    this.isPriceCalculated = false;
    this.multiplier = 1;
    this.router.navigate(['/']);
  }

  multiplierChanged() {
    this.expectedPrice = null;
    this.isPriceCalculated = false;
  }
}
