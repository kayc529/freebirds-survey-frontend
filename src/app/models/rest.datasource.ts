import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './survey.model';
import { SurveyResponse } from './surveyResponse.model';
import { User } from './user.model';

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable()
export class RestDataSource {
  baseUrl: string;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}`;
    } else {
      this.baseUrl = 'https://freebirds-survey.herokuapp.com';
    }
  }

  //create request header with authorization
  createRequestHeader(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token') || '';
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return header;
  }

  getSurveys(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/v1/surveys');
  }

  getSurveyReponses(): Observable<any> {
    const url = this.baseUrl + '/api/v1/surveys/results';
    const httpHeader: HttpHeaders = this.createRequestHeader();
    return this.http.get<Survey[]>(url, { headers: httpHeader });
    // return this.http.get<Survey[]>(url);
  }

  addSurvey(survey: Survey): Observable<any> {
    const url = this.baseUrl + '/api/v1/surveys/add';
    const httpHeader: HttpHeaders = this.createRequestHeader();
    return this.http.post<Survey>(url, survey, { headers: httpHeader });
    // return this.http.post<Survey>(url, survey);
  }

  updateSurvey(survey: Survey): Observable<any> {
    const url = this.baseUrl + '/api/v1/surveys/edit/' + survey._id;
    const httpHeader: HttpHeaders = this.createRequestHeader();
    return this.http.post<Survey>(url, survey, { headers: httpHeader });
    // return this.http.post<Survey>(url, survey);
  }

  deleteSurvey(surveyId: string): Observable<any> {
    const url = this.baseUrl + '/api/v1/surveys/delete/' + surveyId;
    const httpHeader: HttpHeaders = this.createRequestHeader();
    return this.http.delete(url, { headers: httpHeader });
    // return this.http.delete(url);
  }

  addSurveyResponse(response: SurveyResponse): Observable<any> {
    const url = this.baseUrl + '/api/v1/surveys/do-survey/' + response.surveyId;
    return this.http.post(url, response);
  }

  login(user: User): Observable<any> {
    const url = this.baseUrl + '/api/v1/users/login';
    return this.http.post(url, user);
  }

  logout(): Observable<any> {
    const url = this.baseUrl + '/api/v1/users/logout';
    return this.http.get(url);
  }

  register(user: User): Observable<any> {
    const url = this.baseUrl + '/api/v1/users/register';
    return this.http.post(url, user);
  }
}
