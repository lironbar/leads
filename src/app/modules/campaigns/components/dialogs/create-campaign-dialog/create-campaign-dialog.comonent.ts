import { Component } from '@angular/core';
import { Campaign } from '../../../campaign.model';
import { MatDialogRef } from '@angular/material';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-create-campaign-dialog',
  templateUrl: './create-campaign-dialog.component.html',
  styleUrls: ['./create-campaign-dialog.component.css']
})

export class CreateCampaignDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateCampaignDialogComponent>) {}

  public onCancel() {
    this.dialogRef.close();
  }

  public onCreateCampaign(form: NgForm) {
    if (form.valid) {
      const campaign: Campaign = {
        name: form.value.name,
        description: form.value.description,
        price: form.value.price,
        hedgePercentage: form.value.hedgePercentage,
        maxLeads: form.value.maxLeads,
        maxDailyLeads: form.value.maxDailyLeads,
        marketingText: form.value.marketingText,
        imageUrl: form.value.imageUrl
      };
      this.dialogRef.close(campaign);
    }
  }
}
