import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {SharedComponentModule} from '../../shared-components.module';

import {InterfaceRoutingModule} from './interface-routing.module';

import {InterfaceViewComponent} from './components/interface-view/interface-view.component';
import {InterfaceCampaignViewComponent} from './components/interface-campaign-view/interface-campaign-view.component';

@NgModule({
    declarations: [
        InterfaceViewComponent,
        InterfaceCampaignViewComponent
    ],
    imports: [
        SharedModule,
        SharedComponentModule,
        InterfaceRoutingModule
    ],
    providers: [],
    entryComponents: []
})
export class InterfaceModule {}
