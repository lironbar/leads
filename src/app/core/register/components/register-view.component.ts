import {Component, ViewChild} from '@angular/core';
import {User} from '../../user/user.model';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../authentication/authentication.service';
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
                .subscribe(responseUser => {
                    const path = responseUser.members['publishers'].length ? 'publishers' : 'campaigns';
                    this.router.navigate([path]);
                });
        }
    }
}
