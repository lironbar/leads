import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {NgxPermissionsService} from 'ngx-permissions';
import {AuthenticationService} from './core/authentication/authentication.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
                private permissionsService: NgxPermissionsService, public authenticationService: AuthenticationService) {
        this.matIconRegistry.addSvgIcon(
            'affiliate-join', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/affiliate-join.svg'));
        this.matIconRegistry.addSvgIcon(
            'affiliate-main', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/group.svg'));

    }
    ngOnInit() {
        // const user = this.authenticationService.currentUserValue;
        // if (user) {
        //     this.permissionsService.loadPermissions(user.roles);
        // }
    }
}
