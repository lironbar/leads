import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgxPermissionsGuard} from 'ngx-permissions';

import {InterfaceViewComponent} from './components/interface-view/interface-view.component';
import {InterfaceCampaignViewComponent} from './components/interface-campaign-view/interface-campaign-view.component';


const routes: Routes = [
    {
        path: '',
        component: InterfaceViewComponent,
        children: [
            // {path: '', pathMatch: 'full', redirectTo: 'create'},
            // {path: 'create', component: InterfaceCreateViewComponent}
            {path: 'campaign/:id', component: InterfaceCampaignViewComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InterfaceRoutingModule {
}
