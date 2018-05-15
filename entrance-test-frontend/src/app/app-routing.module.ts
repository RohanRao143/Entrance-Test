import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importing components 
import {TechnicalComponent} from './technical/technical.component';


const routes:Routes = [
  {path:'',redirectTo:'/technical', pathMatch:'full'},
  {path:'technical', component:TechnicalComponent},
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],

  exports: [ RouterModule ]
})
export class AppRoutingModule { }
