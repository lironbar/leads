import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {NgxPermissionsService} from 'ngx-permissions';
import {AuthenticationService} from './core/authentication/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from './modules/commons/services/language.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer,
                private permissionsService: NgxPermissionsService,
                private translate: TranslateService,
                private languageService: LanguageService,
                public authenticationService: AuthenticationService
    ) {}
    ngOnInit() {
        this.languageService.initTranslations();
    }
}
