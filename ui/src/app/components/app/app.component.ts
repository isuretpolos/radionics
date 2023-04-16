import { Component } from '@angular/core';
import {Link} from "../../domains/Link";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";

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
    private navigationService:NavigationService
  ) {

    let currentUrl = window.location.href;
    currentUrl = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    this.activateCurrentLink(currentUrl);

    this.navigationService.navigate.subscribe( (url:string) => {
      this.navigate(url);
    });
  }

  private getLinks():Link[] {
    return [
      new Link("DASHBOARD", true),
      new Link("UPLOAD", true),
      new Link("TEST", true)
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
