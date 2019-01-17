import {Component} from '@angular/core';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {Router} from '@angular/router';
import {NgxPermissionsService} from 'ngx-permissions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    title = 'Leads';

    constructor(public authenticationService: AuthenticationService,
                private router: Router,
                private permissionsService: NgxPermissionsService) {
    }

    onLogOut() {
        this.authenticationService.logout()
            .subscribe(onSuccess => {
                this.permissionsService.flushPermissions();
                this.router.navigate(['/login']);
            });
    }
}
