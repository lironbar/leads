import {Component, EventEmitter, Output} from '@angular/core';
import { PublisherService } from '../../publisher.service';
import { MatDialog } from '@angular/material';
import { CreatePublisherDialogComponent } from '../dialogs/create-publisher-dialog/create-publisher-dialog.component';

@Component({
  selector: 'app-publisher-create-button',
  templateUrl: './publisher-create-button.component.html',
  styleUrls: ['./publisher-create-button.component.css']
})

export class PublisherCreateButtonComponent {
    @Output() create: EventEmitter<any> = new EventEmitter();
  constructor(public publisherService: PublisherService, public dialog: MatDialog) {}

  onCreate() {
    const dialogRef = this.dialog.open(CreatePublisherDialogComponent);

    dialogRef.afterClosed().subscribe(publisher => {
      if (publisher) {
          this.create.emit(publisher);
      }
    });
  }
}
