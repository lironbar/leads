import {Component, Inject, OnInit} from '@angular/core';
import {Publisher} from '../../../publisher.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-create-publisher-dialog',
    templateUrl: './create-publisher-dialog.component.html',
    styleUrls: ['./create-publisher-dialog.component.css']
})

export class CreatePublisherDialogComponent implements OnInit{
    publisher;
    type: string;

    constructor(
        public dialogRef: MatDialogRef<CreatePublisherDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { publisher: Publisher }
    ) {}

    ngOnInit() {
        this.publisher = this.data ? {...this.data} : {};
        this.type = this.data ? 'edit' : 'create';
    }

    public onCancel() {
        this.dialogRef.close();
    }

    public onCreatePublisher(form: NgForm) {
        if (form.valid) {
        //     const publisher: Publisher = {
        //         name: form.value.name,
        //         phone: form.value.phone,
        //         email: form.value.email,
        //         address: form.value.address,
        //         phc: form.value.phc
        //     };
        //     this.dialogRef.close(publisher);
            this.dialogRef.close(this.publisher);
        }
    }
}
