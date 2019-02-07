import {Component, Inject, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {Campaign} from '../../../campaign.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-create-campaign-dialog',
    templateUrl: './create-campaign-dialog.component.html',
    styleUrls: ['./create-campaign-dialog.component.css']
})

export class CreateCampaignDialogComponent implements OnInit{
    campaign;
    constructor(
        public dialogRef: MatDialogRef<CreateCampaignDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { campaign: Campaign }
    ) {}

    ngOnInit() {
        this.campaign = this.data ? {...this.data.campaign} : {};
    }

    public onCancel() {
        this.dialogRef.close();
    }

    public onCreateCampaign(form: NgForm) {
        if (form.valid) {
            // const campaign: Campaign = {
            //     name: form.value.name,
            //     description: form.value.description,
            //     price: form.value.price,
            //     hedgePercentage: form.value.hedgePercentage,
            //     maxLeads: form.value.maxLeads,
            //     maxDailyLeads: form.value.maxDailyLeads,
            //     marketingText: form.value.marketingText,
            //     imageUrl: form.value.imageUrl
            // };
            this.dialogRef.close(this.campaign);
        }
    }
}
