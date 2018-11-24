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

  public onAddCampaign(form: NgForm) {
    if (form.valid) {
      const campaign: Campaign = {
        name: form.value.name,
        description: form.value.description,
        imageUrl: form.value.imageUrl,
        price: form.value.price,
        score: form.value.score
      };
      this.dialogRef.close(campaign);
    }
  }
}
