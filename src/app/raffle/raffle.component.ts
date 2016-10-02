import {Component, OnInit} from '@angular/core';
import {RaffleService} from "../services/raffle.service";

@Component({
  moduleId: module.id,
  selector: 'app-raffle',
  templateUrl: 'raffle.component.html',
  styleUrls: ['raffle.component.css'],
  providers: [RaffleService]
})
export class RaffleComponent implements OnInit {

  radioItems = [
    {
      option: 'Horde Gila',
      imgUrl: 'app/raffle/gila.png'
    },
    {
      option: '10 Fade Caracals',
      imgUrl: 'app/raffle/caracal.png'
    },
    {
      option: 'Indy\'s wet dream',
      imgUrl: 'app/raffle/indy.png'
    }];

  model:any;
  isSubmitted:boolean;

  constructor(private service:RaffleService) {
  }

  ngOnInit() {
    this.model = this.radioItems[0];
  }

  onSubmit() {
    this.service.post(this.model).subscribe(
      data => this.isSubmitted = true,
      err => alert(err)
    );
  }

  changeDestination(destination:string) {
    this.model.option = destination;
  }

}
