import {Injectable} from '@angular/core';
import {User} from '../../../core/user/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {

    constructor() {}

    public get currentUserValue() {
        const item = localStorage.getItem('currentUser');
        return JSON.parse(item);
    }

    public get currentUserRole() {
        const item = localStorage.getItem('currentUser');
        const user = JSON.parse(item);
        return user;
    }

    _getCurrentRole(user) {
        // return {
        //     data: user.members.affiliates.length ? user.members.affiliates[0] : user.members.publishers[0],
        //     type: user.isAdmin ? 'ADMIN' : (user.members.affiliates.length ? 'AFFILIATE' : 'PUBLISHER')
        // };
    }
}