import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PublisherService } from '../../publisher.service';
import {ConfirmDialogComponent} from '../../../commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {Publisher} from '../../publisher.model';

@Component({
  selector: 'app-publishers-table',
  templateUrl: './publishers-table.component.html',
  styleUrls: ['./publishers-table.component.css']
})

export class PublishersTableComponent {
  @Input() publishers$: Observable<Publisher[]>;
  displayedColumns: string[] = ['index', 'name', 'phone', 'address', 'campaigns', 'actions'];

  constructor(public publisherService: PublisherService, public dialog: MatDialog) {}

  onRemove(publisher) {
    const confirmDialogData = {
      header: 'Delete Publisher',
      text: 'Are you sure you want to delete this publisher?'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: confirmDialogData});
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.publisherService.delete(publisher._id);
      } else {
        console.log('Dialog Closed');
      }
    });
  }
}
