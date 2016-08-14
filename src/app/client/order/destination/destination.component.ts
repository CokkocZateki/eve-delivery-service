import {Component, Output} from "@angular/core";
import {EventEmitter} from "@angular/compiler/src/facade/async";

@Component({
  selector: 'destination',
  templateUrl: 'app/client/order/destination/destination.component.html',
})
export class DestinationComponent {

  @Output() destinationChanged:EventEmitter<string> = new EventEmitter<string>();

  radioItems = [
    {
      name: '7RM Beanstar',
      imgUrl: 'app/client/order/destination/keepstar.png'
    },
    {
      name: 'GME Fortizar',
      imgUrl: 'app/client/order/destination/fortizar.png'
    }];
  model = this.radioItems[0];

  changeDestination(destination:string) {
    this.destinationChanged.emit(destination);
  }
}
