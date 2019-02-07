import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {AffiliatesRoutingModule} from './affiliates-routing.module';
import {AffiliatesViewComponent} from './components/affiliates-view/affiliates-view.component';
import {AffiliateService} from './affiliates.service';
import {AffiliateCreateButtonComponent} from './components/affiliate-create-button/affiliate-create-button.component';
import {CreateAffiliateDialogComponent} from './components/dialogs/create-affiliate-dialog/create-affiliate-dialog.component';
import {AffiliatesTableComponent} from './components/affiliates-table/affiliates-table.component';
import {AffiliateViewComponent} from './components/affiliate-view/affiliate-view.component';
import {AffiliateInfoBarComponent} from './components/affiliate-info-bar/affiliate-info-bar.component';
import {AffiliateReportsViewComponent} from './components/affiliate-reports-view/affiliate-reports-view.component';

// import {CreatePublisherDialogComponent} from './components/dialogs/create-publisher-dialog/create-publisher-dialog.component';

@NgModule({
    declarations: [
        AffiliatesViewComponent,
        AffiliateCreateButtonComponent,
        CreateAffiliateDialogComponent,
        AffiliatesTableComponent,
        AffiliateViewComponent,
        AffiliateInfoBarComponent,
        AffiliateReportsViewComponent
    ],
    imports: [
        SharedModule,
        AffiliatesRoutingModule
    ],
    providers: [AffiliateService],
    entryComponents: [CreateAffiliateDialogComponent]
})
export class AffiliatesModule {
}
