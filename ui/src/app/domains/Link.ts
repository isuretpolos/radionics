export class Link {
  title:string = "empty";
  active:boolean = false;

  constructor(title:string,active?:boolean) {
    this.title = title;

    if (active != undefined) {
      this.active = active;
    }
  }
}
