import { Component } from '@angular/core';
import { CampaignService } from '../../campaign.service';
import { MatDialog } from '@angular/material';
import { CreateCampaignDialogComponent } from '../dialogs/create-campaign-dialog/create-campaign-dialog.comonent';

@Component({
  selector: 'app-campaign-create-button',
  templateUrl: './campaign-create-button.component.html',
  styleUrls: ['./campaign-create-button.component.css']
})

export class CampaignCreateButtonComponent {

  constructor(public campaignService: CampaignService, public dialog: MatDialog) {}

  onCreate() {
    const dialogRef = this.dialog.open(CreateCampaignDialogComponent);

    dialogRef.afterClosed().subscribe(campaign => {
      if (campaign) {
        this.campaignService.addCampaign(campaign);
      }
    });
  }
}
