import { Component, OnInit } from '@angular/core';

import { QuestionService} from '../question.service';

@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.css']
})
export class TechnicalComponent implements OnInit {
  questions ;
  constructor(public service :QuestionService) { }

  favoriteSeason: string;

  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];

  ngOnInit() {
    this.getQuestions()
  }

  getQuestions(){
    this.service.getQuestions().subscribe((results)=>{
      this.questions = results;
      console.log(results)
    })
  }

}
