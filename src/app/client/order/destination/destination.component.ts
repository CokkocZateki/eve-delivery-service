import {Component, Output} from "@angular/core";
import {EventEmitter} from "@angular/compiler/src/facade/async";

@Component({
  selector: 'destination',
  templateUrl: 'app/client/order/destination/destination.component.html',
})
export class DestinationComponent {

  @Output() destinationChanged: EventEmitter<string> = new EventEmitter<string>();

  radioItems = '7RM Beanstar,GME Fortizar'.split(',');
  model      = { options: '7RM Beanstar' };

  changeDestination(destination:string) {
    this.destinationChanged.emit(destination);
  }
}
