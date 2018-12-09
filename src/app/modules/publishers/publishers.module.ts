import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { PublishersRoutingModule } from './publishers-routing.module';

import { PublishersViewComponent } from './components/publishers-view/publishers-view.component';
import { PublisherListComponent } from './components/publisher-list/publisher-list.component';
import { PublishersTableComponent } from './components/publishers-table/publishers-table.component';
import { PublisherCreateButtonComponent } from './components/publisher-create-button/publisher-create-button.component';
import { PublisherViewComponent } from './components/publisher-view/publisher-view.component';

import { CreatePublisherDialogComponent } from './components/dialogs/create-publisher-dialog/create-publisher-dialog.component';

@NgModule({
  declarations: [
    PublishersViewComponent,
    PublisherListComponent,
    PublishersTableComponent,
    CreatePublisherDialogComponent,
    PublisherCreateButtonComponent,
    PublisherViewComponent
  ],
  imports: [
    SharedModule,
    PublishersRoutingModule
  ],
  providers: [],
  entryComponents: [CreatePublisherDialogComponent]
})
export class PublishersModule {}
