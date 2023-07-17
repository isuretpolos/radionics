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
import { AnalyzeComponent } from './components/analyze/analyze.component';
import {NgChartsModule} from "ng2-charts";
import { BroadcastComponent } from './components/broadcast/broadcast.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RatesComponent } from './components/rates/rates.component';

@NgModule({
  declarations: [
    AppComponent,
    HotbitsComponent,
    DashboardComponent,
    FileUploadComponent,
    TestComponent,
    DisclaimerComponent,
    SettingsComponent,
    DocumentationComponent,
    AnalyzeComponent,
    BroadcastComponent,
    RatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgChartsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
