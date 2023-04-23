import {Component, OnInit} from '@angular/core';
import {AnalyzeService} from "../../services/analyze.service";
import {AnalysisResult} from "../../domains/AnalysisResult";
import {ChartConfiguration} from "chart.js";

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

  constructor(private analyzeService: AnalyzeService) {
  }

  ngOnInit(): void {

    this.bubbleChartDatasets = [
      {
        data: [],
        label: 'Analysis Distribution',
      },
    ];
  }

  analyze() {
    this.analyzing = true;
    this.analysisResult = undefined;

    this.analyzeService.analyze("HOMEOPATHY_Clarke_With_MateriaMedicaUrls.txt").subscribe(r => {
        this.analyzing = false;
        this.analysisResult = r;
        console.log(r)

        this.bubbleChartDatasets = [
          {
            data: [],
            label: 'Analysis Distribution',
          },
        ];



        this.bubbleChartOptions.scales = {
          x: {
            min: this.analysisResult.minGV,
            max: this.analysisResult.maxGV,
          },
          y: {
            min: this.analysisResult.minEV,
            max: this.analysisResult.maxEV,
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
    );
  }

  checkGeneralVitality() {
    this.gv = this.analyzeService.checkGeneralVitalityValue();
  }

  isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))
  }
}
