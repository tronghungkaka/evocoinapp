import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bollinger-band',
  templateUrl: './bollinger-band.component.html',
  styleUrls: ['./bollinger-band.component.css']
})
export class BollingerBandComponent implements OnInit {
  title = 'Bollinger Band Component';

  ngOnInit() {
    console.log("Bollinger band component");
    
  }
}
