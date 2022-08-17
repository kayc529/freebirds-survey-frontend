import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { StaticDataSource } from './static.datasource';
import { Survey } from './survey.model';
import { SurveyResponse } from './surveyResponse.model';

@Injectable()
export class SurveyRepository {
  private surveys: Survey[] = [];
  private responses: SurveyResponse[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getSurveys().subscribe((data) => {
      this.surveys = data.surveys;
    });
    dataSource.getSurveyReponses().subscribe((data) => {
      this.responses = data.responses;
    });
  }

  getSurveys(): Survey[] {
    return this.surveys;
  }

  getSurvey(surveyId: string): Survey | undefined {
    return this.surveys.find((survey) => survey._id === surveyId);
  }

  getResponses(surveyId: string): SurveyResponse[] {
    return this.responses.filter((response) => {
      return response.surveyId === surveyId.trim();
    });
  }

  addSurvey(survey: Survey): any {
    return this.dataSource.addSurvey(survey);
  }

  deleteSurvey(surveyId: string): any {
    return this.dataSource.deleteSurvey(surveyId);
  }

  updateSurvey(survey: Survey): any {
    return this.dataSource.updateSurvey(survey);
  }

  addSurveyResponse(response: SurveyResponse): any {
    return this.dataSource.addSurveyResponse(response);
  }
}
