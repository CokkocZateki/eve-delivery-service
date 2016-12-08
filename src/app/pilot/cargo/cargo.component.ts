import {Component, OnInit, Input} from '@angular/core';
import {NumberGrouping} from "../../common/numberGrouping.pipe";
import {PilotService} from "../../services/pilot.service";

@Component({
  moduleId: module.id,
  selector: 'app-cargo',
  templateUrl: 'cargo.component.html',
  styleUrls: ['cargo.component.css']
})
export class CargoComponent implements OnInit {


  volumeFilled: string;
  volumePending: string;

  percentageFilled: string;
  percentagePending: string;

  totalCargo: number;

  cargoMax = 330000;

  constructor(private service: PilotService) {
  }

  ngOnInit() {
    this.service.getCargoStatus().then(data => {
      console.log(data);
      this.volumePending = "" + data.cargoPending;
      this.volumeFilled = "" + data.cargoShipping;
      this.calculate();
    });
  }

  private calculate() {
    var volumeFilled = parseInt(this.volumeFilled);
    var volumePending = parseInt(this.volumePending);

    this.volumeFilled = new NumberGrouping().transform(volumeFilled);
    this.volumePending = new NumberGrouping().transform(volumePending);

    this.percentageFilled = this.calcCargoPercentage(volumeFilled);
    this.percentagePending = this.calcCargoPercentage(volumePending);

    console.log(this.percentageFilled);

    this.totalCargo = volumeFilled + volumePending;
  }

  isOverfilled(): boolean {
    return this.totalCargo > this.cargoMax;
  }

  calcCargoPercentage(volume: number) {
    var result = parseInt("" + (volume / this.cargoMax * 100));
    return result + "%";
  }

}
