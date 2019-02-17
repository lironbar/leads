import {Component, ViewChild} from '@angular/core';
import {User} from '../../user/user.model';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../../modules/commons/services/snack-bar.service';

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
        private snackBar: SnackBarService,
        private router: Router
    ) {
    }

    onSignIn(form) {
        this.submitted = true;
        if (form.valid) {
            this.authenticationService.login(form.value.email, form.value.password)
                .subscribe(
                    responseUser => {
                        const userRole = responseUser.role.toLowerCase();
                        const isAdmin = (userRole === 'admin'), isPublisher = (userRole === 'publisher');
                        if (isAdmin || isPublisher) {
                            this.router.navigate(['publishers', responseUser._id]);
                        } else {
                            this.router.navigate(['campaigns']);
                        }
                    },
                    error => {
                        console.error('Failed to sign in', error);
                        this.snackBar.error('Failed to sign in');
                    }
                );
        }
    }
}
