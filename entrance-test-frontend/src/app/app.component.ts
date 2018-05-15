import { Component, OnInit } from '@angular/core';

//injecting services
import { QuestionService} from './question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  stream 
  // constructor(public services:QuestionService){}
  
  ngOnInit(){
    this.stream = 'Hello';
    // this.services.getQuestions()
  }
}
