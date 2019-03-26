import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../core/authentication/authentication.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})

export class PagesComponent implements OnInit {
    currentUser;
    rulePath: string;
    reportsLinkRef;
    sidNavPosition = 'start'; // start/end
    tooltipDirection = 'after'; // 'after', 'before', 'above', 'below', 'left', 'right'
    constructor(public authenticationService: AuthenticationService) {}
    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.rulePath = this.currentUser.role === 'PUBLISHER' ? 'publishers' : 'affiliates';
        this.reportsLinkRef = `/${this.rulePath}/reports`
    }
}
