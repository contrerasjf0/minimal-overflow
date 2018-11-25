import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Observable } from 'rxjs';
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

  addQuestion(question: Question) {
    const body = JSON.stringify(question);
    const headers = new  HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.questionsUrl, body, { headers })
            .pipe(
                map((response: Response) => response.json()),
                catchError((error: Response) => Observable.throw(error.json()))
            );
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
  }
}