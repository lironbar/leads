import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxPermissionsModule} from 'ngx-permissions';

import {LeadsPanelsComponent} from './modules/leads/components/leads-panels/leads-panels.component';
import {LeadStatusBoxComponent} from './modules/leads/components/lead-status-box/lead-status-box.component';
import {CampaignListComponent} from './modules/campaigns/components/campaign-list/campaign-list.component';
import {CampaignPanelsComponent} from './modules/campaigns/components/campaign-panels/campaign-panels.component';
import {CampaignCreateButtonComponent} from './modules/campaigns/components/campaign-create-button/campaign-create-button.component';
import {CreateCampaignDialogComponent} from './modules/campaigns/components/dialogs/create-campaign-dialog/create-campaign-dialog.comonent';
import {SendLeadDialogComponent} from './modules/campaigns/components/dialogs/send-lead-dialog/send-lead-dialog.component';

import {BooleanPipe} from './modules/commons/boolean.pipe';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatDialogModule
} from '@angular/material';
import {ConfirmDialogComponent} from './modules/commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {EmptyStateComponent} from './modules/commons/components/empty-state/empty-state.component';

@NgModule({
    declarations: [
        LeadsPanelsComponent,
        LeadStatusBoxComponent,
        CampaignListComponent,
        CampaignPanelsComponent,
        CampaignCreateButtonComponent,
        CreateCampaignDialogComponent,
        SendLeadDialogComponent,
        ConfirmDialogComponent,
        EmptyStateComponent,
        BooleanPipe
    ],
    imports: [
        CommonModule,
        CdkTableModule,
        FormsModule,
        FlexLayoutModule,

        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        MatDialogModule,
        NgxPermissionsModule
    ],
    exports: [
        CommonModule,
        CdkTableModule,
        FormsModule,
        FlexLayoutModule,

        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        LeadsPanelsComponent,
        LeadStatusBoxComponent,
        CampaignListComponent,
        CampaignPanelsComponent,
        CampaignCreateButtonComponent,
        CreateCampaignDialogComponent,
        SendLeadDialogComponent,
        EmptyStateComponent,
        NgxPermissionsModule
    ],
    providers: [],
    entryComponents: [ConfirmDialogComponent, CreateCampaignDialogComponent, SendLeadDialogComponent]
})
export class SharedModule {
}
