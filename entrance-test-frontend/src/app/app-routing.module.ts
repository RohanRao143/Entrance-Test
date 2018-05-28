import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importing components 
import {TechnicalComponent} from './technical/technical.component';
import {TestComponent} from './test/test.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddApplicantComponent } from './add-applicant/add-applicant.component';
import { AddTestComponent } from './add-test/add-test.component';


const routes:Routes = [
  {path:'', component:DashboardComponent},
  {path:'technical', component:TechnicalComponent},
  {path:'test/:id', pathMatch:'full',component:TestComponent},
  {path:'applicant', component:AddApplicantComponent},
  {path:'test', component:AddTestComponent} 
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],

  exports: [ RouterModule ]
})
export class AppRoutingModule { }
