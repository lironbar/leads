import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/auth-guard/auth-guard.service';
import {LoginViewComponent} from './core/login/components/login-view.component';
import {RegisterViewComponent} from './core/register/components/register-view.component';
import {PagesComponent} from './pages/pages.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {PageForbiddenComponent} from './core/error-pages/components/page-forbidden/page-forbidden.component';
import {PageNotFoundComponent} from './core/error-pages/components/page-not-found/page-not-found.component';
import {PageServerErrorComponent} from './core/error-pages/components/page-server-error/page-server-error.component';
import {PageUnauthorizedComponent} from './core/error-pages/components/page-unauthorized/page-unauthorized.component';

const routes: Routes = [
    {path: 'sign-in', component: LoginViewComponent},
    {path: 'register', component: RegisterViewComponent},

    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'publishers',
                loadChildren: './modules/publishers/publishers.module#PublishersModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN', 'PUBLISHER'],
                        redirectTo: '/403'
                    }
                }
            },
            {
                path: 'campaigns',
                loadChildren: './modules/campaigns/campaigns.module#CampaignsModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN', 'AFFILIATE'],
                        redirectTo: '/403'
                    }
                }
            },
            {
                path: 'affiliates',
                loadChildren: './modules/affiliates/affiliates.module#AffiliatesModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN', 'AFFILIATE'],
                        redirectTo: '/403'
                    }
                }
            },
            {
                path: 'interface',
                loadChildren: './modules/interface/interface.module#InterfaceModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN'],
                        redirectTo: '/403'
                    }
                }
            },
            {path: '', redirectTo: '/publishers', pathMatch: 'full'},
        ]
    },

    {path: '401', component: PageUnauthorizedComponent},
    {path: '403', component: PageForbiddenComponent},
    {path: '404', component: PageNotFoundComponent},
    {path: '500', component: PageServerErrorComponent},
    {path: '**', redirectTo: '/403'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
