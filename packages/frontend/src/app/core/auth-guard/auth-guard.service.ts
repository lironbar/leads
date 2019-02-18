import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import {NgxPermissionsService} from 'ngx-permissions';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private permissionsService: NgxPermissionsService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.permissionsService.flushPermissions();
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // Load Permissions by the user roles.
            // const role = currentUser.members.publishers.length ? 'PUBLISHER' : 'AFFILIATE';
            this.permissionsService.loadPermissions([currentUser.role]);
            // this.permissionsService.loadPermissions(currentUser.roles);
            return true;
        }
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        // return false;


        this.router.navigate(['/sign-in']);
        return false;
    }
}
