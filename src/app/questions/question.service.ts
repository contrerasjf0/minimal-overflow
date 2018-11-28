import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../answer/answer.mode';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from'rxjs/operators';
import 'rxjs';



@Injectable()
export class QuestionService {

  private questionsUrl: string;

  constructor(private http: HttpClient) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl);
  }

  getQuestion(id):  Observable<Question>{
    const url = urljoin(this.questionsUrl, id);
    return this.http.get<Question>(url);
  }


  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  addQuestion(question: Question):Observable<Question> {
    const body = JSON.stringify(question);
    const headers = new  HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getToken();

    return this.http.post<Question>(this.questionsUrl + token, body, { headers })
            .pipe(
                catchError((error: Response) => throwError(error))
            );
  }

  addAnswer(answer: Answer):Observable<Answer>{
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = urljoin(this.questionsUrl, answer.question._id.toString(), 'answers');
    const token = this.getToken();

    return this.http.post<Answer>(url + token, body, { headers })
          .pipe( 
            catchError((error: Response) => throwError(error))
          );
  }


  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
  }
}