import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
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

    signUp(user: User, isAdminTestFlag: Boolean) {
        user.token = '123124124asdasfasf123sa';
        user.roles = isAdminTestFlag ? ['ADMIN'] : [user.type];
        if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return this.currentUser;
        }
    }

    login(email: string, password: string) {
        // const fakeData = 'http://localhost:4200/assets/data/user.json';
        // return this.http.get<any>(fakeData)
        // // return this.http.post<any>(`/users/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         if (user && user.token) {
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //             this.currentUserSubject.next(user);
        //             this.router.navigate(['/publishers']);
        //         }
        //         return user;
        //     }));

        const user = {
            email: email,
            password: password,
            token: '123124124asdasfasf123sa',
            roles: ['ADMIN']
        };
        if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return this.currentUser;
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return this.currentUser;
    }
}
