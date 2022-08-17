import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { StaticDataSource } from './static.datasource';
import { SurveyRepository } from './survey.repository';
import { UserRepository } from './user.repository';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    SurveyRepository,
    UserRepository,
    StaticDataSource,
    { provide: StaticDataSource, useClass: RestDataSource },
    RestDataSource,
  ],
})
export class ModelModule {}
