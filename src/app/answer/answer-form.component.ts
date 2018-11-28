import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Answer } from './answer.mode';
import { User } from '../auth/user.model';
import { Question } from '../questions/question.model';
import { QuestionService } from '../questions/question.service';
import SweetScroll from 'sweet-scroll';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-answer-form',
    templateUrl: './answer-form.component.html',
    styles: [ `
        form {
            margin-top: 20px;
        }
    `],
    providers: [QuestionService]
})
export class AnswerFormComponent{
    @Input() question: Question;

    sweetScroll: SweetScroll;
    constructor(
        private questionService: QuestionService,
        private authService: AuthService,
        private router: Router
      ) {
        this.sweetScroll = new SweetScroll();
    }
    

    onSubmit(form: NgForm){

        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/signin');
          }

        const answer = new Answer(
            form.value.description,
            this.question
        );

        this.questionService.addAnswer(answer)
        .subscribe(
          a => {
            this.question.answers.unshift(a);
            this.sweetScroll.to('#title');
          },
          this.authService.handleError
        );

        form.reset();
    }
}