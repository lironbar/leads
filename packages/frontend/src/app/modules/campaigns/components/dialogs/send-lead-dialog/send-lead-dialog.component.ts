import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-send-lead-dialog',
    templateUrl: './send-lead-dialog.component.html',
    styleUrls: ['./send-lead-dialog.component.css']
})

export class SendLeadDialogComponent {
    lead = {};

    constructor(public dialogRef: MatDialogRef<SendLeadDialogComponent>) {}

    public onCancel() {
        this.dialogRef.close();
    }

    public onSendLead(form: NgForm) {
        if (form.valid) {
            const lead = {
                name: form.value.name,
                email: form.value.email,
                phone: form.value.phone
            }
            this.dialogRef.close(lead);
        }
    }
}