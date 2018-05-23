import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importing components 
import {TechnicalComponent} from './technical/technical.component';
import {TestComponent} from './test/test.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes:Routes = [
  {path:'', component:DashboardComponent},
  {path:'technical', component:TechnicalComponent},
  {path:'test/:id',component:TestComponent}
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],

  exports: [ RouterModule ]
})
export class AppRoutingModule { }
