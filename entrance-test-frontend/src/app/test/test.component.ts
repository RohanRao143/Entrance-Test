import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import {QuestionService} from '../question.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  paper
  constructor(private route:ActivatedRoute, private service:QuestionService) { }

  ngOnInit() {
    this.getTest();
  }

  getTest():any{
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getTestPaper(id).subscribe((paper)=>{
      console.log(paper);
      this.paper = paper; 
    })
  }

}
