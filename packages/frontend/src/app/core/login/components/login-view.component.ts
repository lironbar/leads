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
                        const isPublisher = responseUser.members['publishers'].length > 0;
                        const path = responseUser.isAdmin || isPublisher ? 'publishers' : 'campaigns';
                        const commands = isPublisher ? [path, responseUser.members['publishers'][0]._id] : [path];
                        this.router.navigate(commands);

                        // this.router.navigate([path]);
                    },
                    error => {
                        console.error('Failed to sign in', error);
                        this.snackBar.error('Failed to sign in');
                    }
                );
        }
    }
}