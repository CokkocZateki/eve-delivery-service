import {Component, Output, OnInit, Input} from "@angular/core";
import {EventEmitter} from "@angular/compiler/src/facade/async";

@Component({
  selector: 'destination',
  templateUrl: 'app/frontpage/order/destination/destination.component.html',
})
export class DestinationComponent implements OnInit {

  @Output() destinationChanged:EventEmitter<string> = new EventEmitter<string>();
  @Input() defaultDestination:string;

  radioItems = [
    {
      name: '7RM Beanstar',
      imgUrl: 'app/frontpage/order/destination/keepstar.png'
    },
    {
      name: 'GME Fortizar',
      imgUrl: 'app/frontpage/order/destination/fortizar.png'
    },
    {
      name: 'Capital Staging',
      imgUrl: 'app/frontpage/order/destination/staging.jpg'
    }
    ];

  model:any;

  ngOnInit() {
    if (undefined == this.defaultDestination) {
      this.model = this.radioItems[0];
    } else {
      for(var i = 0; i < this.radioItems.length; i++) {
        let item = this.radioItems[i];
        if (this.defaultDestination === item.name) {
          this.model = item;
        }
      }
    }
  }

  changeDestination(destination:string) {
    this.destinationChanged.emit(destination);
  }
}
