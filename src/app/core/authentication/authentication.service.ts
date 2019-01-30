import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../user/user.model';
import { Constants } from '../../modules/commons/constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private BASE_URL = Constants.BASE_URL;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentUserRoles() {
        return this.currentUserSubject.value.roles;
    }

    signUp(user: User) {
        return this.http.post<User>(`${this.BASE_URL}/register`, user)
            .pipe(
                map(createdUser => {
                    // user.token = '123124124asdasfasf123sa';
                    localStorage.setItem('currentUser', JSON.stringify(createdUser));
                    this.currentUserSubject.next(createdUser);
                    return this.currentUserSubject.value;
                })
            );
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${this.BASE_URL}/login`, {username: username, password: password})
            .pipe(
                map(userResponse => {
                    // if (user && user.token) {
                    // }
                        localStorage.setItem('currentUser', JSON.stringify(userResponse));
                        this.currentUserSubject.next(userResponse);
                        return userResponse;
                })
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return this.currentUser;
    }
}
