import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {SharedComponentModule} from '../../shared-components.module';
import {PublishersRoutingModule} from './publishers-routing.module';

import {PublishersViewComponent} from './components/publishers-view/publishers-view.component';
import {PublisherListComponent} from './components/publisher-list/publisher-list.component';
import {PublishersTableComponent} from './components/publishers-table/publishers-table.component';
import {PublisherCreateButtonComponent} from './components/publisher-create-button/publisher-create-button.component';
import {PublisherViewComponent} from './components/publisher-view/publisher-view.component';
import {PublisherInfoBarComponent} from './components/publisher-info-bar/publisher-info-bar.component';
import {PublisherReportsViewComponent} from './components/publisher-reports-view/publisher-reports-view.component';

import {CreatePublisherDialogComponent} from './components/dialogs/create-publisher-dialog/create-publisher-dialog.component';

@NgModule({
    declarations: [
        PublishersViewComponent,
        PublisherListComponent,
        PublishersTableComponent,
        CreatePublisherDialogComponent,
        PublisherCreateButtonComponent,
        PublisherViewComponent,
        PublisherInfoBarComponent,
        PublisherReportsViewComponent,
    ],
    imports: [
        SharedModule,
        SharedComponentModule,
        PublishersRoutingModule
    ],
    providers: [],
    entryComponents: [CreatePublisherDialogComponent]
})
export class PublishersModule {
}
