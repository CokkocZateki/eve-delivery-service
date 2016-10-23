import {Component, OnInit} from "@angular/core";
import {ManagerService} from "../../services/manager.service";
import {NumberGrouping} from "../../common/numberGrouping.pipe";

@Component({
  selector: 'cargo',
  templateUrl: 'app/manager/cargo/cargo.component.html',
  providers: [ManagerService]
})
export class CargoComponent implements OnInit {

  public cargoPercentageFilled: string;
  public cargoVolumeFilled: string;
  public cargoPercentagePending: string;
  public cargoVolumePending: string;

  public cargoMax = 300000 * 2;

  constructor(private service: ManagerService) {
  }

  ngOnInit() {
    this.service.volumeShipping().subscribe(
      data => {
        var volumeShipping = data.json().volumeShipping;
        this.cargoVolumeFilled = new NumberGrouping().transform(volumeShipping);
        this.cargoPercentageFilled = this.calcCargoPercentage(volumeShipping);
      },
      err => console.log(err)
    );

    this.service.volumePending().subscribe(
      data => {
        var volumePending = data.json().volumePending;
        this.cargoVolumePending = new NumberGrouping().transform(volumePending);
        this.cargoPercentagePending = this.calcCargoPercentage(volumePending);
      },
      err => console.log(err)
    );
  }

  calcCargoPercentage(volume: number) {
    var result = parseInt("" + (volume / this.cargoMax * 100));
    return result + "%";
  }
}
