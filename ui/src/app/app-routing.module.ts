import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {HttpClientModule} from "@angular/common/http";
import {TestComponent} from "./components/test/test.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {AnalyzeComponent} from "./components/analyze/analyze.component";
import {BroadcastComponent} from "./components/broadcast/broadcast.component";
import {RatesComponent} from "./components/rates/rates.component";

const routes: Routes = [
  {path: '', redirectTo: 'DASHBOARD', pathMatch: 'full'},
  {path: 'DASHBOARD', component:DashboardComponent},
  {path: 'ANALYSIS', component:AnalyzeComponent},
  {path: 'BROADCAST', component:BroadcastComponent},
  {path: 'RATES', component:RatesComponent},
  {path: 'UPLOAD', component:FileUploadComponent},
  {path: 'TEST', component:TestComponent},
  {path: 'SETTINGS', component:SettingsComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
