import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService implements OnInit {

  ngOnInit(){
  }

  constructor(private http:HttpClient) { }

  getQuestions():any{
    return this.http.get<any>('node_api/questions')
    }
}
