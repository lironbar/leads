import {Component, Inject} from '@angular/core';
import {Affiliate} from '../../../affiliate.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-create-affiliate-dialog',
    templateUrl: './create-affiliate-dialog.component.html',
    styleUrls: ['./create-affiliate-dialog.component.css']
})

export class CreateAffiliateDialogComponent {
    affiliate;
    header: string;
    action: string;

    constructor(
        public dialogRef: MatDialogRef<CreateAffiliateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { affiliate: Affiliate }
    ){}

    ngOnInit() {
        this.affiliate = this.data ? {...this.data} : {};
        this.header = this.data ? 'Edit Affiliate' : 'Create Affiliate';
        this.action = this.data ? 'UPDATE' : 'CREATE';
    }

    public onCancel() {
        this.dialogRef.close();
    }

    public onCreateAffiliate(form: NgForm) {
        if (form.valid) {
            // const affiliate: Affiliate = {
            //     name: form.value.name,
            //     phone: form.value.phone,
            //     email: form.value.email,
            //     address: form.value.address
            // };
            // this.dialogRef.close(affiliate);

            this.dialogRef.close(this.affiliate);
        }
    }
}
