export class SurveyResponse {
  constructor(
    public _id: string,
    public surveyId: string,
    public answers?: string[]
  ) {}
}
