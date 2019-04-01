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

    public onCreateCampaign(form: NgForm) {
        if (form.valid) {
            this.dialogRef.close(this.campaign);
        }
    }

    public onClose() {
        this.dialogRef.close();
    }
}
