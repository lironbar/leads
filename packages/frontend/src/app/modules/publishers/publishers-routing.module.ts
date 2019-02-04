import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublishersViewComponent} from './components/publishers-view/publishers-view.component';
import {PublisherViewComponent} from './components/publisher-view/publisher-view.component';
import {PublisherReportsViewComponent} from './components/publisher-reports-view/publisher-reports-view.component';
// import { NgxPermissionsGuard } from 'ngx-permissions';


const routes: Routes = [
    {path: '', component: PublishersViewComponent},
    {path: ':id', component: PublisherViewComponent},
    {path: 'reports/:id', component: PublisherReportsViewComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublishersRoutingModule {
}
