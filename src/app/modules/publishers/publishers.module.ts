import { NgModule } from '@angular/core';
import { PublishersRoutingModule } from './publishers-routing.module';
import { SharedModule } from '../../shared.module';

import { PublisherService } from './publisher.service';
import { PublishersViewComponent } from './components/publishers-view/publishers-view.component';
import { PublisherListComponent } from './components/publisher-list/publisher-list.component';
import { PublishersTableComponent } from './components/publishers-table/publishers-table.component';
import { PublisherCreateButtonComponent } from './components/publisher-create-button/publisher-create-button.component';

import { CreatePublisherDialogComponent } from './components/dialogs/create-publisher-dialog/create-publisher-dialog.component';
@NgModule({
  declarations: [
    PublishersViewComponent,
    PublisherListComponent,
    PublishersTableComponent,
    CreatePublisherDialogComponent,
    PublisherCreateButtonComponent
  ],
  imports: [
    SharedModule,
    PublishersRoutingModule
  ],
  providers: [PublisherService],
  entryComponents: [CreatePublisherDialogComponent]
})
export class PublishersModule {}
