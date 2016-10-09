import {Component, OnInit, provide} from "@angular/core";
import {ManagerService} from "../../services/manager.service";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {NumberGrouping} from "../../common/numberGrouping.pipe";

@Component({
  selector: 'cargo',
  templateUrl: 'app/manager/cargo/cargo.component.html',
  providers: [ManagerService, provide(AuthConfig, {useValue: new AuthConfig()}), AuthHttp]
})
export class CargoComponent implements OnInit {

  public cargoPercentageFilled:string;
  public cargoVolumeFilled:string;
  public cargoPercentagePending:string;
  public cargoVolumePending:string;

  public cargoMax = 330000;

  constructor(private service:ManagerService) {
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

  calcCargoPercentage(volume:number) {
    var result = parseInt("" + (volume / this.cargoMax * 100));
    return result + "%";
  }
}
