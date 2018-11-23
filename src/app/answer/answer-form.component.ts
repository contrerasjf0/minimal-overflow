import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Answer } from './answer.mode';
import { User } from '../auth/user.model';
import { Question } from '../questions/question.model';

@Component({
    selector: 'app-answer-form',
    templateUrl: './answer-form.component.html',
    styles: [ `
        form {
            margin-top: 20px;
        }
    `]
})
export class AnswerFormComponent{
    @Input() question: Question;

    onSubmit(form: NgForm){
        const answer = new Answer(
            form.value.description,
            this.question,
            new Date(),
            new User(null, null,'Paula', 'Becerra')
        );

        this.question.answers.unshift(answer);

        form.reset();
    }
}