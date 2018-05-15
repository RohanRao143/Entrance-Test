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


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { TechnicalComponent } from './technical/technical.component';
import { QuestionComponent } from './question/question.component';


@NgModule({
  //components which are going to be used should be declared over here
  declarations: [
    AppComponent,
    TechnicalComponent,
    QuestionComponent,
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
