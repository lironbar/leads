import {Component, EventEmitter, Output} from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateAffiliateDialogComponent } from '../dialogs/create-affiliate-dialog/create-affiliate-dialog.component';

@Component({
  selector: 'app-affiliate-create-button',
  templateUrl: './affiliate-create-button.component.html',
  styleUrls: ['./affiliate-create-button.component.css']
})

export class AffiliateCreateButtonComponent {
    @Output() create: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog) {}

  onCreate() {
    const dialogRef = this.dialog.open(CreateAffiliateDialogComponent);

    dialogRef.afterClosed().subscribe(affiliate => {
      if (affiliate) {
          this.create.emit(affiliate);
      }
    });
  }
}
