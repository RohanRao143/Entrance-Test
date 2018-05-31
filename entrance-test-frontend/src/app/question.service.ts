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
    return this.http.get<any>('node_api/questions');
  }

  getTestPaper(id:number){
    return this.http.get<any>('node_api/test/'+id);
  }

  getApplicantForm(){
    return this.http.get<any>('node_api/applicant');
  }

  postApplicant(data){
    return this.http.post<any>('node_api/applicant/'+data.id ,data)
  }
}
