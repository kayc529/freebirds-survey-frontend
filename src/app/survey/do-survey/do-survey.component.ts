import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Survey } from 'src/app/models/survey.model';
import { SurveyRepository } from 'src/app/models/survey.repository';
import { SurveyResponse } from 'src/app/models/surveyResponse.model';

@Component({
  selector: 'app-do-survey',
  templateUrl: './do-survey.component.html',
  styleUrls: ['./do-survey.component.css'],
})
export class DoSurveyComponent implements OnInit {
  //testing survey as string
  private surveyId: string = '';

  constructor(
    private route: ActivatedRoute,
    private repository: SurveyRepository,
    private router: Router
  ) {
    //get surveyId from URL
    this.route.params.subscribe((params: Params) => {
      this.surveyId = params['id'];
    });
  }

  get survey(): Survey | undefined {
    return this.repository.getSurvey(this.surveyId);
  }

  ngOnInit(): void {}

  submitSurveyResponse(): void {
    //index of the current question
    let questionIndex = 0;
    //all the answers of this survey
    let answers: string[] = [];

    //loop through all the questions
    while (true) {
      //get all the answer elements of the current question
      let answerElements = document.getElementsByClassName(questionIndex + '');

      console.log(answerElements);

      //no answer elements = no such question, end loop
      if (answerElements.length === 0) {
        break;
      }
      //get the question types
      const questionType = answerElements[0].classList.value.split(' ')[1];

      console.log('questionType: ', questionType);

      //get the answers depending on the question type
      switch (questionType) {
        case 'TEXT':
          answers.push((<HTMLInputElement>answerElements[0]).value);
          break;
        case 'T_F':
          //check if true is selected
          answers.push(
            (<HTMLInputElement>answerElements[0]).checked.toString()
          );
          break;
        case 'OPTIONS':
          //get the value of the selected radio button
          for (let i = 0; i < answerElements.length; i++) {
            if ((<HTMLInputElement>answerElements[i]).checked) {
              answers.push((<HTMLInputElement>answerElements[i]).value);
            }
          }
          break;
        case 'CHECKBOX':
          let checked = '';
          //put all the selected option values into a string
          for (let i = 0; i < answerElements.length; i++) {
            if ((<HTMLInputElement>answerElements[i]).checked) {
              checked += `${(<HTMLInputElement>answerElements[i]).value} `;
            }
          }
          answers.push(checked);
          break;
        default:
          //if cannot get the question type, add blank answer to prevent shifting of answers
          answers.push('');
          break;
      }

      //to the next question
      questionIndex++;
    }

    //get surveyId from URL
    const newResponse: SurveyResponse = {
      _id: '',
      surveyId: this.surveyId,
      answers,
    };

    //submit response
    this.repository.addSurveyResponse(newResponse).subscribe(
      (data: any) => {
        alert('Response submitted!');
        this.router.navigateByUrl('/surveys');
      },
      (err: any) => {
        console.log(err);
        alert('Failed to submit response, please try again!');
      }
    );
  }
}
