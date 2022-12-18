import { Component, OnInit } from "@angular/core";
import { EChartOption } from "echarts";
@Component({
  selector: "app-dashboard2",
  templateUrl: "./dashboard2.component.html",
  styleUrls: ["./dashboard2.component.scss"],
})
export class Dashboard2Component implements OnInit {
  config: any;

  line_chart: EChartOption = {
    grid: {
      top: "6",
      right: "0",
      bottom: "17",
      left: "25",
    },
    xAxis: {
      data: ["2014", "2015", "2016", "2017", "2018", "2019", "2020"],
      axisLine: {
        lineStyle: {
          color: "#eaeaea",
        },
      },
      axisLabel: {
        fontSize: 10,
        color: "#9aa0ac",
      },
    },
    tooltip: {
      show: true,
      showContent: true,
      alwaysShowContent: false,
      triggerOn: "mousemove",
      trigger: "axis",
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: "#eaeaea",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#eaeaea",
        },
      },
      axisLabel: {
        fontSize: 10,
        color: "#9aa0ac",
      },
    },
    series: [
      {
        name: "Doctor 1",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: "rgba(0,0,0,0.4)",
          shadowBlur: 10,
          shadowOffsetY: 10,
        },
        data: [70, 200, 80, 180, 170, 105, 210],
        symbolSize: 10,
        // color: ["#FF8D60"]
      },
      {
        name: "Doctor 2",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: "rgba(0,0,0,0.4)",
          shadowBlur: 10,
          shadowOffsetY: 10,
        },
        symbolSize: 10,
        // size: 10,
        data: [80, 250, 30, 120, 260, 100, 180],
        // color: ["#009DA0"]
      },
      {
        name: "Doctor 3",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: "rgba(0,0,0,0.4)",
          shadowBlur: 10,
          shadowOffsetY: 10,
        },
        symbolSize: 10,
        // size: 10,
        data: [85, 130, 85, 225, 80, 190, 120],
        // color: ["#009DA0"]
      },
    ],
    color: ["#3FA7DC", "#F6A025", "#9BC311"],
  };

  // Doughnut chart start
  public doughnutChartLabels: string[] = ["India", "USA", "Itely"];
  public doughnutChartData: number[] = [45, 25, 30];
  public doughnutChartLegend = false;
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ["#735A84", "#E76412", "#9BC311"],
    },
  ];
  public doughnutChartType = "doughnut";
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
  };
  // Doughnut chart end
  constructor() {}
  ngOnInit() {}
}
