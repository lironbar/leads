import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/auth-guard/auth-guard.service';
import {LoginViewComponent} from './core/login/components/login-view.component';
import {PagesComponent} from './pages/pages.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {PageForbiddenComponent} from './core/error-pages/components/page-forbidden/page-forbidden.component';
import {PageNotFoundComponent} from './core/error-pages/components/page-not-found/page-not-found.component';
import {PageServerErrorComponent} from './core/error-pages/components/page-server-error/page-server-error.component';

const routes: Routes = [
    {path: 'login', component: LoginViewComponent},
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
            {path: '', redirectTo: '/publishers', pathMatch: 'full'},
        ]
    },
    {path: '403', component: PageNotFoundComponent},
    {path: '404', component: PageForbiddenComponent},
    {path: '500', component: PageServerErrorComponent},
    {path: '**', redirectTo: '/403'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
