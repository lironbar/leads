import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AffiliatesViewComponent} from './components/affiliates-view/affiliates-view.component';
import {AffiliateViewComponent} from './components/affiliate-view/affiliate-view.component';
import {AffiliateReportsViewComponent} from './affiliate-reports-view/affiliate-reports-view.component';


const routes: Routes = [
    {path: '', component: AffiliatesViewComponent},
    {path: ':id', component: AffiliateViewComponent},
    {path: 'reports/:id', component: AffiliateReportsViewComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AffiliatesRoutingModule {
}
