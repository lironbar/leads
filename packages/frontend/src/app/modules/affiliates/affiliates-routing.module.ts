import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AffiliatesViewComponent} from './components/affiliates-view/affiliates-view.component';
import {AffiliateViewComponent} from './components/affiliate-view/affiliate-view.component';
import {AffiliateReportsViewComponent} from './components/affiliate-reports-view/affiliate-reports-view.component';
import {NgxPermissionsGuard} from 'ngx-permissions';


const routes: Routes = [
    {
        path: '',
        component: AffiliatesViewComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMIN'],
                redirectTo: '/403'
            }
        }
    },
    {path: ':id', component: AffiliateViewComponent},
    {path: 'reports/:id', component: AffiliateReportsViewComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AffiliatesRoutingModule {
}
