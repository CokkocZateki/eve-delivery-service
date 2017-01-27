import {Component, Input, OnChanges, SimpleChange, OnInit} from "@angular/core";
import {Order} from "../../common/order";

@Component({
  selector: "selectFilter",
  template: `<select class="mdl-select__input"
                    id="option"
                    name="dest"
                    [(ngModel)]="selectedDestination"
                    #select >
            <option *ngFor="let dest of destinations"
                    [value]="dest">{{dest}}</option>
          </select>`
})
export class SelectFilter implements OnInit, OnChanges {

  @Input("data") private orders: Array<Order> = [];
  @Input("selectedDestination") private selectedDestination: string = "All destinations";

  private destinations: Array<String> = [];

  ngOnInit() {
    this.destinations = ["All destinations"].concat(this.getUniqueDestinationsFromOrders());
  }

  public ngOnChanges(changes:{[key:string]:SimpleChange}):any {
    console.log("changes!");
    if (changes["selectedDestination"]) {
      console.log("selected dest changed!");
    }
  }

  private getUniqueDestinationsFromOrders(): Array<string> {
    return Array.from(new Set(this.orders.map(order => {
      return order.destination;
    })));
  }
}
