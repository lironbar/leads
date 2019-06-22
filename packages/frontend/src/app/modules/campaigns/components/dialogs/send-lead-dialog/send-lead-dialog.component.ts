import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {Campaign} from '../../../campaign.model';

@Component({
    selector: 'app-send-lead-dialog',
    templateUrl: './send-lead-dialog.component.html',
    styleUrls: ['./send-lead-dialog.component.css']
})

export class SendLeadDialogComponent implements OnInit{
    lead = {};

    constructor(
        public dialogRef: MatDialogRef<SendLeadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public fields: { field: any[] }
    ) {}

    ngOnInit() {}

    public onCancel() {
        this.dialogRef.close(false);
    }

    public onSendLead(form: NgForm) {
        if (form.valid) {
            this.dialogRef.close(this.lead);
        }
    }
}