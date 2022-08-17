import { NgModule } from '@angular/core';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { DoSurveyComponent } from './do-survey/do-survey.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { ModelModule } from '../models/model.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SurveyManagementComponent } from './survey-management/survey-management.component';

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule],
  declarations: [
    SurveyListComponent,
    DoSurveyComponent,
    AddSurveyComponent,
    EditSurveyComponent,
    SurveyResultsComponent,
    SurveyManagementComponent,
  ],
  exports: [SurveyListComponent],
})
export class SurveyModule {}
