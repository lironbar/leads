import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDialogModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {LoginViewComponent} from './core/login/components/login-view.component';
import {RegisterViewComponent} from './core/register/components/register-view.component';
import {PagesComponent} from './pages/pages.component';
import {LoaderComponent} from './modules/commons/components/loader/loader.component';
import {LeadViewComponent} from './modules/leads/components/lead-view/lead-view.component';

import {PageForbiddenComponent} from './core/error-pages/components/page-forbidden/page-forbidden.component';
import {PageNotFoundComponent} from './core/error-pages/components/page-not-found/page-not-found.component';
import {PageServerErrorComponent} from './core/error-pages/components/page-server-error/page-server-error.component';
import {PageUnauthorizedComponent} from './core/error-pages/components/page-unauthorized/page-unauthorized.component';

import {AuthenticationService} from './core/authentication/authentication.service';
import {LoaderService} from './modules/commons/services/loader.service';
import {SnackBarService} from './modules/commons/services/snack-bar.service';
import {LanguageService} from './modules/commons/services/language.service';
import { AuthGuard } from './core/auth-guard/auth-guard.service';
import {CampaignService} from './modules/campaigns/campaign.service';
import {PublisherService} from './modules/publishers/publisher.service';
import {UsersService} from './modules/users/services/users.service';
import {LeadService} from './modules/leads/services/lead.service';
import {InterfaceService} from './modules/interface/interface.service';

import { HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { LoaderInterceptorService} from './core/Interceptoers/httpconfig.interceptor';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginViewComponent,
        RegisterViewComponent,
        PagesComponent,
        LoaderComponent,
        LeadViewComponent,
        PageForbiddenComponent,
        PageNotFoundComponent,
        PageServerErrorComponent,
        PageUnauthorizedComponent
    ],
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        MatDialogModule,
        FormsModule,
        MatBadgeModule,
        SharedModule,
        NgxPermissionsModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [FlexLayoutModule, LoaderComponent],
    // Services
    providers: [
        CampaignService,
        PublisherService,
        InterfaceService,
        AuthenticationService,
        UsersService,
        LeadService,
        LoaderService,
        SnackBarService,
        LanguageService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptorService,
            multi: true
        },
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {
}
