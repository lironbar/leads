import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AffiliateService } from '../../affiliates.service';
import {ConfirmDialogComponent} from '../../../commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import { Affiliate } from '../../affiliate.model';

@Component({
  selector: 'app-affiliates-table',
  templateUrl: './affiliates-table.component.html',
  styleUrls: ['./affiliates-table.component.css']
})

export class AffiliatesTableComponent {
  @Input() affiliates: Affiliate[];
  // displayedColumns: string[] = ['index', 'name', 'phone', 'address', 'campaigns', 'actions'];
    displayedColumns: string[] = ['index', 'name', 'phone', 'email', 'actions'];

  constructor(public affiliateService: AffiliateService, public dialog: MatDialog) {}

  onRemove(affiliate) {
    const confirmDialogData = {
      header: 'Delete Affiliate',
      text: 'Are you sure you want to delete this affiliate?'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: confirmDialogData});
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.affiliateService.delete(affiliate._id);
      } else {
        console.log('Dialog Closed');
      }
    });
  }
}
