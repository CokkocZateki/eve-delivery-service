import {Component, OnInit} from '@angular/core';
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {NumberGrouping} from "../common/numberGrouping.pipe";

@Component({
  moduleId: module.id,
  selector: 'app-jf-service',
  templateUrl: 'jf-service.component.html',
  styleUrls: ['jf-service.component.css'],
  directives: [MODAL_DIRECTIVES],
  pipes: [NumberGrouping],
})
export class JfServiceComponent implements OnInit {

  desto: string;
  reward: number = 0;

  volume: string;
  collateral: string;

  showError: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  setDesto(desto: string): void {
    this.desto = desto;
    this.collateral = null;
    this.volume = null;
    this.reward = 0;
  }

  private calcReward(): number {
    let vol = 0;
    if (this.volume) {
      vol = +this.volume;
    }
    let col = 0;
    if (this.collateral) {
      col = +this.collateral;
    }
    let volFee = this.getVolFee();
    let colFee = 0.01;
    return parseInt("" + (vol * volFee + col * colFee));
  }

  private getVolFee() {
    if (this.desto == "7RM") {
      return 200;
    } else {
      return 300;
    }
  }

  updateReward(event: number, element: string): void {
    let exceedsVolume = element == 'volume' && event > 150000 || parseInt(this.volume) > 150000;
    let exceedsCollateral = element == 'collateral' && event > 5000000000 || parseInt(this.volume) > 5000000000;
    if (exceedsVolume || exceedsCollateral) {
      this.showError = true;
    } else {
      this.showError = false;
    }
    this.reward = this.calcReward();
  }

  copyToClipboard() {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", "" + this.reward);
  }


}
