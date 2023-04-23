import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./components/app/app.component";
import {HashLocationStrategy, LocationStrategy, NgOptimizedImage} from "@angular/common";
import { HotbitsComponent } from './components/hotbits/hotbits.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { TestComponent } from './components/test/test.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DocumentationComponent } from './components/documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    HotbitsComponent,
    DashboardComponent,
    FileUploadComponent,
    TestComponent,
    DisclaimerComponent,
    SettingsComponent,
    DocumentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
