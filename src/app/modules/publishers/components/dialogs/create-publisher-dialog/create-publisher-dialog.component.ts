import {Component} from '@angular/core';
import {Publisher} from '../../../publisher.model';
import {MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-create-publisher-dialog',
    templateUrl: './create-publisher-dialog.component.html',
    styleUrls: ['./create-publisher-dialog.component.css']
})

export class CreatePublisherDialogComponent {
    constructor(public dialogRef: MatDialogRef<CreatePublisherDialogComponent>) {
    }

    public onCancel() {
        this.dialogRef.close();
    }

    public onCreatePublisher(form: NgForm) {
        if (form.valid) {
            const publisher: Publisher = {
                name: form.value.name,
                phone: form.value.phone,
                email: form.value.email,
                address: form.value.address,
                phc: form.value.phc
            };
            this.dialogRef.close(publisher);
        }
    }
}
