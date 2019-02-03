import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../core/authentication/authentication.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})

export class PagesComponent implements OnInit {
    currentUserRole;
    sidNavPosition = 'start'; // start/end
    tooltipDirection = 'after'; // 'after', 'before', 'above', 'below', 'left', 'right'
    constructor(public authenticationService: AuthenticationService) {}
    ngOnInit() {
        this.currentUserRole = this.authenticationService.currentUserRole;
    }
}
