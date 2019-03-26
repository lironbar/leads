import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {Router} from '@angular/router';
import {NgxPermissionsService} from 'ngx-permissions';
import {User} from '../core/user/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    title = 'Leads';
    rolesConstants = [
        {icon: 'work', roleValue: 'ADMIN', value: 'admin'},
        {icon: 'person_pin', roleValue: 'PUBLISHER', value: 'publishers'},
        {icon: 'group', roleValue: 'AFFILIATE', value: 'affiliates'}
    ];
    roles: any[];
    user: User;
    selected: string;

    constructor(
        public authenticationService: AuthenticationService,
        private router: Router,
        private permissionsService: NgxPermissionsService
    ) {
    }

    ngOnInit() {
        this.user = this.authenticationService.currentUserValue;
        // this.roles = this.rolesConstants.filter(r => {
        //    return this.user.members[r.value] && this.user.members[r.value].length > 0;
        // });
    }
    onChangeRole(selectedRole) {
        this.permissionsService.flushPermissions();
        this.permissionsService.loadPermissions([selectedRole.roleValue]);
    }
    onSignOut() {
        this.authenticationService.logout();
    }
}
