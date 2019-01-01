import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './core/auth-guard/auth-guard.service';
import {LoginViewComponent} from './core/login/components/login-view.component';
import {PagesComponent} from './pages/pages.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginViewComponent
    },
    {
        path: 'pages',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'publishers',
                loadChildren: './modules/publishers/publishers.module#PublishersModule'
            },
            {
                path: 'campaigns',
                loadChildren: './modules/campaigns/campaigns.module#CampaignsModule'
            },
            {
                path: 'affiliates',
                loadChildren: './modules/affiliates/affiliates.module#AffiliatesModule'
            }
        ]
    },
    {path: '', redirectTo: '/pages/publishers', pathMatch: 'full'},
    {path: '**', redirectTo: '/pages/publishers'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
