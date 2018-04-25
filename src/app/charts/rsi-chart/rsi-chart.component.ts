import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'rsi-chart',
    templateUrl: './rsi-chart.component.html'
})
export class RSIChartComponent implements OnInit {
    // rsi line chart
    @Input("datasets") data: Array<number>;
    public lineChartData: Array<any> = [
        {data: this.data, label: 'RSI Chart', fill: false, pointRadius: 0, borderWidth: 1}
    ];
    public lineChartLabels:Array<any>;
    
    public lineChartOptions:any = {
        responsive: true,
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        },
        scales: {
            yAxes: [{
                display: false,
                gridLines: {
                    display: false
                }
            }],
            xAxes: [{
                display: false,
                gridLines: {
                    display: false
                }
            }]
        },
        tooltips: {
            enabled: false
        }
    };

    public lineChartColors:Array<any> = [
        { // grey
        backgroundColor: 'white',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    public lineChartLegend:boolean = false;
    public lineChartType:string = 'line';

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    ngOnInit() {
        this.lineChartData[0].data = this.data;
        this.lineChartLabels = new Array(this.data.length);
        // console.log(JSON.stringify(this.data));
    }
}