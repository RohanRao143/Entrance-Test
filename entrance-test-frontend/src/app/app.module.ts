import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//importing apis
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http'; 
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { TechnicalComponent } from './technical/technical.component';
import { QuestionComponent } from './question/question.component';
import { TestComponent } from './test/test.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddApplicantComponent } from './add-applicant/add-applicant.component';
import { AddTestComponent } from './add-test/add-test.component';


@NgModule({
  //components which are going to be used should be declared over here
  declarations: [
    AppComponent,
    TechnicalComponent,
    QuestionComponent,
    TestComponent,
    DashboardComponent,
    AddApplicantComponent,
    AddTestComponent,
  ],
  //apis you just want to use must be in imports
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    MatRadioModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
