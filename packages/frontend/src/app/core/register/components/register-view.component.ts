import {Component, ViewChild} from '@angular/core';
import {User} from '../../user/user.model';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../authentication/authentication.service';
import {SnackBarService} from '../../../modules/commons/services/snack-bar.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register-view',
    templateUrl: './register-view.component.html',
    styleUrls: ['./register-view.component.css']
})

export class RegisterViewComponent {

    submitted = false;
    type = 'affiliate';
    // @ViewChild('signupForm') public signupForm: NgForm;
    constructor(
        public authenticationService: AuthenticationService,
        public snackBar: SnackBarService,
        private router: Router
    ) {}



    onRegister(form) {
        this.submitted = true;
        if (form.valid) {
            const user: User = {
                name: form.value.name,
                phone: form.value.phone,
                email: form.value.email,
                password: form.value.password,
                phc: form.value.phc,
                contact: form.value.contact
                // type: form.value.type
            };
            this.authenticationService.register(user, this.type)
                .subscribe(
                    responseUser => {
                        // const path = responseUser.members['publishers'].length ? 'publishers' : 'campaigns';
                        // this.router.navigate([path]);
                        const isPublisher = responseUser.members['publishers'].length > 0;
                        const path = responseUser.isAdmin || isPublisher ? 'publishers' : 'campaigns';
                        const id = isPublisher ? responseUser.members['publishers'][0] : undefined;
                        this.router.navigate([path, id]);
                    },
                    error => {
                        console.error('Failed to register', error);
                        this.snackBar.error('Failed to register');
                    }
                );
        }
    }
}
