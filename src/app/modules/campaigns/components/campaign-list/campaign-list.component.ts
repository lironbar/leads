import { Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { CampaignService } from '../../campaign.service';
import { ConfirmDialogComponent } from '../../../commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {Campaign} from '../../campaign.model';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})

export class CampaignListComponent {
  @Input() campaigns$: Observable<Campaign[]>;
  defaultImageUrl = 'https://www.jensenleisurefurniture.com/wp-content/themes/jensen-leisure/media/woocommerce/product-placeholder.png';
  constructor(public campaignService: CampaignService, public dialog: MatDialog) {}

  onDelete(id) {
    const confirmDialogData = {
      header: 'Delete Campaign',
      text: 'Are you sure you want to delete this campaign?'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: confirmDialogData});
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.campaignService.delete(id);
      } else {
        console.log('The dialog was closed');
      }
    });
  }

}
