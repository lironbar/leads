import { Component } from '@angular/core';
import {User} from '../../user/user.model';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
    selector: 'app-login-view',
    templateUrl: './login-view.component.html',
    styleUrls: ['./login-view.component.css']
})

export class LoginViewComponent {
    constructor(public authenticationService: AuthenticationService){};

    onSignUp(form) {
        if (form.valid) {
            const user: User = {
                name: form.value.name,
                email: form.value.email,
                password: form.value.password
            };
            this.authenticationService.signUp(user);
        }
    }
}
