import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../user/user.model';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    signUp(user: User) {
        user.token = '123124124asdasfasf123sa';
        if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/pages/publishers']);
        }
    }

    login(username: string, password: string) {
        const fakeData = 'http://localhost:4200/assets/data/user.json';
        return this.http.get<any>(fakeData)
        // return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}