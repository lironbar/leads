import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';

import {LeadStatusBoxComponent} from './modules/leads/components/lead-status-box/lead-status-box.component';
import {CampaignListComponent} from './modules/campaigns/components/campaign-list/campaign-list.component';
import {CampaignCreateButtonComponent} from './modules/campaigns/components/campaign-create-button/campaign-create-button.component';
import {CreateCampaignDialogComponent} from './modules/campaigns/components/dialogs/create-campaign-dialog/create-campaign-dialog.comonent';
import {SendLeadDialogComponent} from './modules/campaigns/components/dialogs/send-lead-dialog/send-lead-dialog.component';
import {EmptyStateComponent} from './modules/commons/components/empty-state/empty-state.component';
import {StatusBoxComponent} from "./modules/commons/components/status-box/status-box.component";
import {CampaignPanelsComponent} from './modules/campaigns/components/campaign-panels/campaign-panels.component';
import {LeadsPanelsComponent} from './modules/leads/components/leads-panels/leads-panels.component';
import {ConfirmDialogComponent} from './modules/commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {AddFieldDialogComponent} from './modules/interface/components/dialogs/add-field-dialog/add-field-dialog.component';
import {ApprovePublisherLeadsDialogComponent} from "./modules/publishers/components/dialogs/approve-publisher-leads-dialog/approve-publisher-leads-dialog.component";

@NgModule({
    declarations: [
        CampaignPanelsComponent,
        LeadsPanelsComponent,
        LeadStatusBoxComponent,
        CampaignListComponent,
        CampaignCreateButtonComponent,
        CreateCampaignDialogComponent,
        SendLeadDialogComponent,
        EmptyStateComponent,
        StatusBoxComponent,
        ConfirmDialogComponent,
        AddFieldDialogComponent,
        ApprovePublisherLeadsDialogComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        CampaignPanelsComponent,
        LeadsPanelsComponent,
        LeadStatusBoxComponent,
        CampaignListComponent,
        CampaignCreateButtonComponent,
        CreateCampaignDialogComponent,
        SendLeadDialogComponent,
        EmptyStateComponent,
        StatusBoxComponent,
        ConfirmDialogComponent,
        AddFieldDialogComponent,
        ApprovePublisherLeadsDialogComponent
    ],
    entryComponents: [CreateCampaignDialogComponent, SendLeadDialogComponent, ConfirmDialogComponent, AddFieldDialogComponent, ApprovePublisherLeadsDialogComponent]
})
export class SharedComponentModule { }