import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../campaign.model';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { CampaignService } from '../../campaign.service';
import { ConfirmDialogComponent } from '../../../commons/components/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})

export class CampaignListComponent implements OnInit {
  campaigns$: Observable<{}>;
  defaultImageUrl = 'https://www.jensenleisurefurniture.com/wp-content/themes/jensen-leisure/media/woocommerce/product-placeholder.png';
  constructor(public campaignService: CampaignService, public dialog: MatDialog) {}

  ngOnInit() {
    this.campaigns$ = this.campaignService.getCampaigns();
  }

  onDelete(id) {
    const confirmDialogData = {
      header: 'Delete Campaign',
      text: 'Are you sure you want to delete this campaign?'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: confirmDialogData});
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.campaignService.deleteCampaign(id);
      } else {
        console.log('The dialog was closed');
      }
    });
  }

}
