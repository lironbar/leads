import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {Router} from '@angular/router';
import {NgxPermissionsService} from 'ngx-permissions';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../modules/commons/services/language.service';
import {SnackBarService} from '../modules/commons/services/snack-bar.service';
import {User} from '../core/user/user.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
    title = 'Leads';
    private languageSubscription: Subscription;
    languages: string[] = [];
    currentLanguage: string;
    user: User;
    selected: string;

    constructor(
        public authenticationService: AuthenticationService,
        private router: Router,
        private permissionsService: NgxPermissionsService,
        private translate: TranslateService,
        private languageService: LanguageService,
        private snackBar: SnackBarService
    ) {
    }

    ngOnInit() {
        this.user = this.authenticationService.currentUserValue;
        this.languages = this.translate.getLangs();
        this.languageSubscription = this.languageService.getCurrentLanguage().subscribe(updatedLanguage => {
            if (this.currentLanguage) {
                this.snackBar.success('Language changed successfully')
            }
            this.currentLanguage = updatedLanguage;
        });
    }
    onChangeLanguage(lang) {
        this.languageService.useLanguage(lang);
    }
    onSignOut() {
        this.authenticationService.logout();
    }
    ngOnDestroy() {
        this.languageSubscription.unsubscribe();
    }


}
