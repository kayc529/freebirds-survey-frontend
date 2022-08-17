import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from 'src/app/models/survey.model';
import { SurveyRepository } from 'src/app/models/survey.repository';

@Component({
  selector: 'app-survey-management',
  templateUrl: './survey-management.component.html',
  styleUrls: ['./survey-management.component.css'],
})
export class SurveyManagementComponent implements OnInit {
  userId: string | null = localStorage.getItem('user_id');
  userRole: string | null = localStorage.getItem('user_role');

  constructor(private repository: SurveyRepository, private router: Router) {}

  ngOnInit(): void {
    //redirect user back to home page if not logged in
    if (!localStorage.getItem('access_token')) {
      this.router.navigateByUrl('/');
      return;
    }

    this.userId = localStorage.getItem('user_id');
    this.userRole = localStorage.getItem('user_role');
    this.repository.getSurveys();
  }

  get surveys(): Survey[] {
    return this.repository.getSurveys();
  }

  deleteSurvey(surveyId: string): void {
    this.repository.deleteSurvey(surveyId).subscribe(
      (data: any) => {
        //refresh list when survey is successfully deleted
        window.location.reload();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        const msg = err.error.msg || 'Failed to remove survey';
        alert(msg);
      }
    );
  }
}
