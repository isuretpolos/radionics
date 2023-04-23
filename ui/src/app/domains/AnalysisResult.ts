export class AnalysisResult {
  gv:number = 0;
  rates:Rate[] = [];
  minGV:number = 0;
  maxGV:number = 0;
  minEV:number = 0;
  maxEV:number = 0;
}

export class Rate {
  name:string = "";
  url:string|undefined;
  energeticValue:number = 0;
  gv:number = 0;
}
