import { NgModule } from '@angular/core';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CoreModule } from '@angular/flex-layout';

import { SharedModule } from '../../shared.module';
import { CampaignService } from './campaign.service';
import { CampaignsViewComponent } from './components/campaigns-view/campaigns-view.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { CampaignCreateButtonComponent } from './components/campaign-create-button/campaign-create-button.component';
import { CampaignImageUrlComponent } from './components/campaign-image-url/campaign-image-url.comonent';
import { CreateCampaignDialogComponent } from './components/dialogs/create-campaign-dialog/create-campaign-dialog.comonent';


@NgModule({
  declarations: [
    CampaignsViewComponent,
    CampaignListComponent,
    CampaignCreateButtonComponent,
    CampaignImageUrlComponent,
    CreateCampaignDialogComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    CampaignsRoutingModule
  ],
  providers: [CampaignService],
  entryComponents: [CreateCampaignDialogComponent]
})
export class CampaignsModule {}
