import {Component, HostListener} from '@angular/core';
import {Link} from "../../domains/Link";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";
import {AnalyzeService} from "../../services/analyze.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Radionics';
  links: Link[] = this.getLinks();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationService:NavigationService,
    public analyzeService: AnalyzeService
  ) {

    let currentUrl = window.location.href;
    currentUrl = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    this.activateCurrentLink(currentUrl);

    this.navigationService.navigate.subscribe( (url:string) => {
      this.navigate(url);
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.analyzeService.mouseX = event.clientX;
    this.analyzeService.mouseY = event.clientY;
  }

  private getLinks():Link[] {
    return [
      new Link("DASHBOARD", true),
      new Link("ANALYSIS", false),
      new Link("BROADCAST", false),
      new Link("UPLOAD", false),
      new Link("TEST", false),
      new Link("SETTINGS", false)
    ]
  }

  navigate(navigationPath: string) {
    this.activateCurrentLink(navigationPath);
    this.router.navigate([navigationPath], {relativeTo: this.route});
  }

  private activateCurrentLink(navigationPath?: string) {

    if (navigationPath?.length === 0) {
      navigationPath = 'DASHBOARD';
    }

    this.links.forEach(link => {
      link.active = false;

      if (link.title === navigationPath) {
        link.active = true;
      }
    });
  }
}
