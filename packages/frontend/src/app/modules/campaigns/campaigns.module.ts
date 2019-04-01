import {NgModule} from '@angular/core';
import {CampaignsRoutingModule} from './campaigns-routing.module';
// import {CoreModule} from '@angular/flex-layout';

import {SharedModule} from '../../shared.module';
import {CampaignService} from './campaign.service';
import {CampaignsViewComponent} from './components/campaigns-view/campaigns-view.component';
// import { CampaignCreateButtonComponent } from './components/campaign-create-button/campaign-create-button.component';
import {CampaignImageUrlComponent} from './components/campaign-image-url/campaign-image-url.comonent';

import {SharedComponentModule} from '../../shared-components.module';

@NgModule({
    declarations: [
        CampaignsViewComponent,
        // CampaignCreateButtonComponent,
        CampaignImageUrlComponent
    ],
    imports: [
        SharedModule,
        SharedComponentModule,
        // CoreModule,
        CampaignsRoutingModule
    ],
    providers: [CampaignService],
    entryComponents: []
})
export class CampaignsModule {}
