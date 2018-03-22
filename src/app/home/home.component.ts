import { Component, OnInit } from '@angular/core';
import { Service } from '../binance/api/client/services/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home';

  constructor(
    private service: Service
  ) { }
  ngOnInit() {
    this.service.gettest("https://springbootefirstxample.herokuapp.com/hello").subscribe(
      res => console.log(JSON.stringify(res))
    );
  }
}
