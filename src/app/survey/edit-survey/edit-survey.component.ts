import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Survey, SurveyQuestion } from 'src/app/models/survey.model';
import { SurveyRepository } from 'src/app/models/survey.repository';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditSurveyComponent implements OnInit {
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

  get survey(): Survey | undefined {
    return this.repository.getSurvey(this.surveyId);
  }

  ngOnInit(): void {
    //redirect user back to home page if not logged in
    if (!localStorage.getItem('access_token')) {
      this.router.navigateByUrl('/');
      return;
    }
  }

  addQuestion(): void {
    //get the form element
    let newSurveyForm = document.getElementById('new-survey-form');
    //create a div container
    let questionContainer = document.createElement('div');
    questionContainer.classList.add('row');
    questionContainer.classList.add('text-right');
    questionContainer.style.marginBottom = '1rem';

    //create labels
    let questionLabel = document.createElement('label');
    let typeLabel = document.createElement('label');
    questionLabel.classList.add('col-3');
    questionLabel.innerHTML = 'Question';
    typeLabel.classList.add('col-2');
    typeLabel.innerHTML = 'Question Type';

    //create quesiont input field
    let questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.classList.add('question');
    questionInput.classList.add('col-4');
    questionInput.classList.add('Qbox');

    //create select and options
    let typeSelect = document.createElement('select');
    typeSelect.classList.add('type');

    let option1 = document.createElement('option');
    option1.value = 'TEXT';
    option1.text = 'Text';
    typeSelect.add(option1);
    let option2 = document.createElement('option');
    option2.value = 'T_F';
    option2.text = 'True or False';
    typeSelect.add(option2);
    let option3 = document.createElement('option');
    option3.value = 'OPTIONS';
    option3.text = 'Options';
    typeSelect.add(option3);
    let option4 = document.createElement('option');
    option4.value = 'CHECKBOX';
    option4.text = 'Checkbox';
    typeSelect.add(option4);

    //put question label and select into the div
    questionContainer.appendChild(questionLabel);
    questionContainer.appendChild(questionInput);
    questionContainer.appendChild(typeLabel);
    questionContainer.appendChild(typeSelect);

    //add the div element to the end of the form element
    newSurveyForm?.appendChild(questionContainer);
  }

  updateSurvey(): void {
    const title =
      (<HTMLInputElement>document.getElementById('title'))?.value || '';

    //check if the title is blank
    if (!title) {
      alert('Please enter a title');
      return;
    }

    const description =
      (<HTMLInputElement>document.getElementById('description'))?.value || '';
    const questionInputs = document.getElementsByClassName('question');
    const typeSelects = document.getElementsByClassName('type');
    let questions: SurveyQuestion[] = [];

    //check if any question is blank
    //loop to create an array of question object
    for (let i = 0; i < questionInputs.length; i++) {
      let question = (<HTMLInputElement>questionInputs[i]).value;
      if (!question) {
        alert('You cannot leave a question blank!');
        return;
      }
      questions.push({ question, questionType: '' });
    }

    //loop to add questionType to each question object
    for (let i = 0; i < typeSelects.length; i++) {
      questions[i] = {
        ...questions[i],
        questionType: (<HTMLInputElement>typeSelects[i]).value,
      };
    }

    const surveyToEdit: Survey = {
      _id: this.surveyId,
      title,
      description,
      questions,
    };

    console.log(surveyToEdit);

    this.repository.updateSurvey(surveyToEdit).subscribe(
      (data: any) => {
        alert('Survey updated!');
      },
      (err: any) => {
        console.log(err);
        const msg = err.error.msg || 'Failed to update survey';
        alert(msg);
      }
    );
  }

  back() {
    window.location.href = '/survey-management';
  }
}
