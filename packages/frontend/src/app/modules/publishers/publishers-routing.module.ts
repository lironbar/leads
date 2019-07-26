import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublishersViewComponent} from './components/publishers-view/publishers-view.component';
import {PublisherViewComponent} from './components/publisher-view/publisher-view.component';
import {PublisherReportsViewComponent} from './components/publisher-reports-view/publisher-reports-view.component';
import {PublisherApproveLeadsViewComponent} from './components/publisher-approve-leads-view/publisher-approve-leads-view.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {PublisherCampaignsViewComponent} from './components/publisher-campaigns-view/publisher-campaigns-view.component';
// import { NgxPermissionsGuard } from 'ngx-permissions';


const routes: Routes = [
    // {path: '', redirectTo: '/publishers/list', pathMatch: 'full'},
    {
        path: '',
        component: PublishersViewComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMIN'],
                redirectTo: '/403'
            }
        }
    },
    {
        path: ':id',
        component: PublisherViewComponent,
        children: [
            { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
            {path: 'campaigns', component: PublisherCampaignsViewComponent},
            {path: 'approve-leads', component: PublisherApproveLeadsViewComponent}
        ]
    },
    {path: 'reports/:id', component: PublisherReportsViewComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublishersRoutingModule {
}
