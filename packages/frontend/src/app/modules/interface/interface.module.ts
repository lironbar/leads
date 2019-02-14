import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';

import {InterfaceRoutingModule} from './interface-routing.module';

import {InterfaceViewComponent} from './components/interface-view/interface-view.component';
import {InterfaceCreateViewComponent} from './components/interface-create-view/interface-create-view.component';
import {InterfaceCampaignViewComponent} from './components/interface-campaign-view/interface-campaign-view.component';

@NgModule({
    declarations: [
        InterfaceViewComponent,
        InterfaceCreateViewComponent,
        InterfaceCampaignViewComponent
    ],
    imports: [
        SharedModule,
        InterfaceRoutingModule
    ],
    providers: [],
    entryComponents: []
})
export class InterfaceModule {}
