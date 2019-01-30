import {Component, ViewChild} from '@angular/core';
import {User} from '../../user/user.model';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-view',
    templateUrl: './login-view.component.html',
    styleUrls: ['./login-view.component.css']
})

export class LoginViewComponent {

    submitted = false;
    viewType = 'signUp';
    type = 'PUBLISHER';
    // @ViewChild('signupForm') public signupForm: NgForm;
    constructor(
        public authenticationService: AuthenticationService,
        private router: Router
    ) {}

    setViewType(viewType) {
        this.viewType = viewType;
    }

    onSignUp(form) {
        this.submitted = true;
        if (form.valid) {
            const user: User = {
                name: form.value.name,
                email: form.value.email,
                password: form.value.password,
                type: form.value.type
            };
            this.authenticationService.signUp(user)
                .subscribe(responseUser => {
                    this._navigateToRouter(responseUser.type);
                });
        }
    }

    onSignIn(form) {
        this.submitted = true;
        if (form.valid) {
            this.authenticationService.login(form.value.email, form.value.password)
                .subscribe(responseUser => {
                    this._navigateToRouter(responseUser.type);
                });
        }
    }

    _navigateToRouter(type) {
        const path = `/${type === 'PUBLISHER' ? 'publishers' : 'affiliates'}`;
        this.router.navigate([path]);
    }
}
