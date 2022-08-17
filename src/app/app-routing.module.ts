import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AddSurveyComponent } from './survey/add-survey/add-survey.component';
import { DoSurveyComponent } from './survey/do-survey/do-survey.component';
import { EditSurveyComponent } from './survey/edit-survey/edit-survey.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { SurveyResultsComponent } from './survey/survey-results/survey-results.component';
import { SurveyManagementComponent } from './survey/survey-management/survey-management.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  {
    path: 'surveys',
    component: SurveyListComponent,
    data: { title: 'Surveys' },
  },
  {
    path: 'survey-management',
    component: SurveyManagementComponent,
    data: { title: 'Survey Management' },
  },
  {
    path: 'surveys/add',
    component: AddSurveyComponent,
    data: { title: 'Add New Survey' },
  },
  {
    path: 'surveys/edit/:id',
    component: EditSurveyComponent,
    data: { title: 'Edit Survey' },
  },
  {
    path: 'surveys/do-survey/:id',
    component: DoSurveyComponent,
    data: { title: 'Do Survey' },
  },
  {
    path: 'surveys/results/:id',
    component: SurveyResultsComponent,
    data: { title: 'Survey Results' },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
