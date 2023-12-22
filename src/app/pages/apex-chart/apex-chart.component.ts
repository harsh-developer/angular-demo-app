import { Component, } from "@angular/core";
import { Utilities } from "src/app/core/utils/utilities";
@Component({
  selector: 'app-apex-chart',
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.scss']
})


export class ApexChartComponent {
  simplePieChart: any;

  constructor(private utilities: Utilities) {

  }


  ngOnInit(): void {
    this._simplePieChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');
  }


  private _simplePieChart(colors: any) {
    colors = this.utilities.getChartColorsArray(colors);
    this.simplePieChart = {
      series: [44, 55, 13, 43, 22],
      chart: {
        height: 300,
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      legend: {
        position: "bottom",
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      colors: ['#FFA2A2', '#D9D9D9', '#433F99', '#009DFF', '#C695FA'],
    };
  }
}
