import {Component, OnInit} from '@angular/core';
import {AnalyzeService} from "../../services/analyze.service";
import {AnalysisResult} from "../../domains/AnalysisResult";

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  gv: number | undefined;
  analyzing: boolean = false;
  analysisResult:AnalysisResult|undefined;

  constructor(private analyzeService: AnalyzeService) {
  }

  ngOnInit(): void {
  }

  analyze() {
    this.analyzing = true;
    this.analysisResult = undefined;

    this.analyzeService.analyze("HOMEOPATHY_Clarke_With_MateriaMedicaUrls.txt").subscribe(r => {
        this.analyzing = false;
        this.analysisResult = r;
      }
    );
  }

  checkGeneralVitality() {
    this.gv = this.analyzeService.checkGeneralVitalityValue();
  }
}
