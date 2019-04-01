import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-page-unauthorized',
    templateUrl: './page-unauthorized.component.html',
    styleUrls: ['./page-unauthorized.component.css']
})

export class PageUnauthorizedComponent {
    constructor(
        private router: Router
    ){}
    onSignIn() {
        this.router.navigate(['/sign-in']);
    }
}