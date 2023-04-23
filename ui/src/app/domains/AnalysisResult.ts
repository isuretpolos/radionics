export class AnalysisResult {
  gv:number = 0;
  rates:Rate[] = []
}

export class Rate {
  name:string = "";
  url:string|undefined;
  energeticValue:number = 0;
  gv:number = 0;
}
