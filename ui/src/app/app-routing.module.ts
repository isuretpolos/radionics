import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: 'DASHBOARD', pathMatch: 'full'},
  {path: 'DASHBOARD', component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
