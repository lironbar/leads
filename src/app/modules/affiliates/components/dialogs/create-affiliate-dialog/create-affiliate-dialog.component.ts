import {Component} from '@angular/core';
import {Affiliate} from '../../../affiliate.model';
import {MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-create-affiliate-dialog',
    templateUrl: './create-affiliate-dialog.component.html',
    styleUrls: ['./create-affiliate-dialog.component.css']
})

export class CreateAffiliateDialogComponent {
    constructor(public dialogRef: MatDialogRef<CreateAffiliateDialogComponent>) {
    }

    public onCancel() {
        this.dialogRef.close();
    }

    public onCreateAffiliate(form: NgForm) {
        if (form.valid) {
            const affiliate: Affiliate = {
                name: form.value.name,
                phone: form.value.phone,
                email: form.value.email,
                address: form.value.address
            };
            this.dialogRef.close(affiliate);
        }
    }
}
