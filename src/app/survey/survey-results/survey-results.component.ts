import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Survey } from 'src/app/models/survey.model';
import { SurveyRepository } from 'src/app/models/survey.repository';
import { SurveyResponse } from 'src/app/models/surveyResponse.model';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css'],
})
export class SurveyResultsComponent implements OnInit {
  title: string;
  private surveyId: string = '';

  constructor(
    private route: ActivatedRoute,
    private repository: SurveyRepository,
    private router: Router
  ) {
    this.title = this.route.snapshot.data['title'];
    //get surveyId from URL
    this.route.params.subscribe((params: Params) => {
      this.surveyId = params['id'];
      console.log('surveyId: ', this.surveyId);
    });
  }

  //get single survey with current surveyId
  get survey(): Survey | undefined {
    return this.repository.getSurvey(this.surveyId);
  }

  //get survey responses for current surveyId
  get responses(): SurveyResponse[] {
    console.log(this.repository.getResponses(this.surveyId));
    return this.repository.getResponses(this.surveyId);
  }

  ngOnInit(): void {
    //redirect user back to home page if not logged in
    if (!localStorage.getItem('access_token')) {
      this.router.navigateByUrl('/');
      return;
    }
  }
}
