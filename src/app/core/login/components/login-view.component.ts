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
    // @ViewChild('signupForm') public signupForm: NgForm;
    constructor(
        public authenticationService: AuthenticationService,
        private router: Router
    ) {}

    onSignIn(form) {
        this.submitted = true;
        if (form.valid) {
            this.authenticationService.login(form.value.email, form.value.password)
                .subscribe(responseUser => {
                    // this._navigateToRouter(responseUser.type);
                    const path = responseUser.members['publishers'].length ? 'publishers' : 'campaigns';
                    this.router.navigate([path]);
                });
        }
    }

    _navigateToRouter(type) {
        // const path = `/${type === 'PUBLISHER' ? 'publishers' : 'affiliates'}`;


        // const path = `/${type === 'AFFILIATE' ? 'campaigns' : 'publishers'}`;
        // this.router.navigate([path]);
    }
}
