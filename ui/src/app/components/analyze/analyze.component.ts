import {Component, OnInit} from '@angular/core';
import {AnalyzeService} from "../../services/analyze.service";
import {AnalysisResult} from "../../domains/AnalysisResult";
import {ChartConfiguration} from "chart.js";
import {RandomNumberService} from "../../services/random-number.service";

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  gv: number | undefined;
  analyzing: boolean = false;
  analysisResult: AnalysisResult | undefined;

  public bubbleChartOptions: ChartConfiguration<'bubble'>['options'] = {
    responsive: false,
    scales: {
      x: {
        min: 0,
        max: 1500,
      },
      y: {
        min: 0,
        max: 1500,
      }
    }
  };
  public bubbleChartLegend = false;

  public bubbleChartDatasets: ChartConfiguration<'bubble'>['data']['datasets'] = [
    {
      data: [],
      label: 'Series A',
    },
  ];

  constructor(
    public analyzeService: AnalyzeService,
    public randomNumberService: RandomNumberService) {
  }

  ngOnInit(): void {

    this.bubbleChartDatasets = [
      {
        data: [],
        label: 'Analysis Distribution',
      },
    ];

    let lastAnalysis = localStorage.getItem('lastAnalysis');
    if (lastAnalysis) {
      this.analysisResult = JSON.parse(lastAnalysis);
      this.initBubbleChart();
    }
  }

  analyze() {
    this.analyzing = true;
    this.analysisResult = undefined;

    this.analyzeService.analyze("HOMEOPATHY_Clarke_With_MateriaMedicaUrls.txt").subscribe(r => {
        this.analyzing = false;
        this.analysisResult = r;
        this.initBubbleChart();
        localStorage.setItem('lastAnalysis', JSON.stringify(this.analysisResult));
      }
    );
  }

  initBubbleChart() {
    this.bubbleChartDatasets = [
      {
        data: [],
        label: 'Analysis Distribution',
      },
    ];

    let xMin = this.analysisResult.minGV;
    let xMax = this.analysisResult.maxGV;
    let yMin = this.analysisResult.minEV;
    let yMax = this.analysisResult.maxEV;

    if (xMax < 1000) xMax = 1000;
    if (yMax < 1000) yMax = 1000;

    this.bubbleChartOptions.scales = {
      x: {
        min: xMin,
        max: xMax
      },
      y: {
        min: yMin,
        max: yMax
      }
    }

    this.analysisResult.rates.forEach(r => {
      this.bubbleChartDatasets[0].data.push({
        x: r.gv,
        y: r.energeticValue,
        r: (50 / this.analysisResult.maxGV * r.gv)
      })
    })
  }

  checkGeneralVitality() {
    this.gv = this.analyzeService.checkGeneralVitalityValue();
  }

  isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))
  }
}
