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

@NgModule({
  declarations: [
    AppComponent,
    HotbitsComponent,
    DashboardComponent,
    FileUploadComponent,
    TestComponent,
    DisclaimerComponent
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
