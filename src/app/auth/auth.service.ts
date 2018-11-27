import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, catchError } from'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  
  usersUrl: string;
  currentUser?: User;

  constructor(private http: HttpClient, private router: Router) {

    this.usersUrl = urljoin(environment.apiUrl, 'auth');

    if (this.isLoggedIn()) {
      const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(email, null, firstName, lastName, userId);
    }

  }

  signin(user: User): Observable<any> {

    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(urljoin(this.usersUrl, 'signin'), body, { headers })
                .pipe(
                      catchError((error: Response) => throwError(error))
                    );
  }

  signup(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(urljoin(this.usersUrl, 'signup'), body, { headers })
              .pipe(
                catchError((error: Response) => throwError(error))
              );
  }

  login = (val) => {
    console.log(val);
    let { token, userId, firstName, lastName, email } = val;
    this.currentUser = new User(email, null, firstName, lastName, userId);
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ userId, firstName, lastName, email }));
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/');
  }

}
