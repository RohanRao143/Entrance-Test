import { Component, OnInit } from '@angular/core';
import { QuestionService} from '../question.service';

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit {

  constructor(public service:QuestionService) { }
  tests;
  admins;
  test;
  admin;
  firstName='';
  lastName='';
  hrs = '3';
  minutes = '0';

  ngOnInit() { 
    this.getApplicantForm();
  }

  getApplicantForm():any {
    this.service.getApplicantForm().subscribe((form)=>{
      this.tests = form.tests;
      this.admins = form.admin;
      console.log(this.tests,this.admins)
    })
  }

  submit(){
    let id = new Date().valueOf();
    let time = parseInt(this.hrs)*60*60 + parseInt(this.minutes)*60
    console.log(this.admin,this.test,this.firstName,this.lastName,id);
    let data = {id:id,admin:this.admin,firstname:this.firstName,lastname:this.lastName, tests:[this.test], time:time}
    this.service.postApplicant(data).subscribe();
  }
}
