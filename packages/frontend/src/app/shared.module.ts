import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxPermissionsModule} from 'ngx-permissions';

import {CampaignListComponent} from './modules/campaigns/components/campaign-list/campaign-list.component';
import {CampaignPanelsComponent} from './modules/campaigns/components/campaign-panels/campaign-panels.component';
import {CampaignCreateButtonComponent} from './modules/campaigns/components/campaign-create-button/campaign-create-button.component';
import {CreateCampaignDialogComponent} from './modules/campaigns/components/dialogs/create-campaign-dialog/create-campaign-dialog.comonent';

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
        CampaignListComponent,
        CampaignPanelsComponent,
        CampaignCreateButtonComponent,
        CreateCampaignDialogComponent,
        ConfirmDialogComponent,
        EmptyStateComponent
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
        CampaignListComponent,
        CampaignPanelsComponent,
        CampaignCreateButtonComponent,
        CreateCampaignDialogComponent,
        EmptyStateComponent,
        NgxPermissionsModule
    ],
    providers: [],
    entryComponents: [ConfirmDialogComponent, CreateCampaignDialogComponent]
})
export class SharedModule {
}
