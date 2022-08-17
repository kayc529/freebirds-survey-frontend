import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { Observable, from } from 'rxjs';
import { SurveyResponse } from './surveyResponse.model';

@Injectable()
export class StaticDataSource {
  private surveys: Survey[] = dummySurveys;
  private responses: SurveyResponse[] = dummyResponses;

  getSurveys(): Observable<Survey[]> {
    return from([this.surveys]);
  }

  getSurveyReponses(): Observable<SurveyResponse[]> {
    return from([this.responses]);
  }
}

const dummySurveys: Survey[] = [
  {
    _id: 's111',
    title: 'First survey',
    description: 'This is my first survey',
    questions: [
      {
        question: 'Question 1',
        questionType: 'CHECKBOX',
      },
      {
        question: 'Question 2',
        questionType: 'OPTIONS',
      },
      {
        question: 'Question 3',
        questionType: 'T_F',
      },
      {
        question: 'Question 4',
        questionType: 'TEXT',
      },
    ],
  },
  {
    _id: 's112',
    title: 'Second survey',
    description: 'This is my second survey',
    questions: [
      {
        question: 'Question 1',
        questionType: 'CHECKBOX',
      },
      {
        question: 'Question 2',
        questionType: 'OPTIONS',
      },
      {
        question: 'Question 3',
        questionType: 'T_F',
      },
      {
        question: 'Question 4',
        questionType: 'TEXT',
      },
    ],
  },
  {
    _id: 's113',
    title: 'Third survey',
    description: 'This is my third survey',
    questions: [
      {
        question: 'Question 1',
        questionType: 'CHECKBOX',
      },
      {
        question: 'Question 2',
        questionType: 'OPTIONS',
      },
      {
        question: 'Question 3',
        questionType: 'T_F',
      },
      {
        question: 'Question 4',
        questionType: 'TEXT',
      },
    ],
  },
];

const dummyResponses = [
  {
    _id: 'r1',
    surveyId: 's111',
    answers: ['Twitter Facebook', 'Positive', 'false', 'Answer 1'],
  },
  {
    _id: 'r2',
    surveyId: 's112',
    answers: ['Twitter Facebook Instagram', 'Negative', 'true', 'Answer 2'],
  },
  {
    _id: 'r3',
    surveyId: 's113',
    answers: ['Facebook Instagram', 'Neutral', 'false', 'Answer 3'],
  },
  {
    _id: 'r4',
    surveyId: 's111',
    answers: ['Twitter Facebook Instagram', 'Positive', 'true', 'Answer 4'],
  },
];
