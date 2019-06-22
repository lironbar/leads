import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {InterfaceField} from '../../../interface.model';

@Component({
    selector: 'app-add-property-dialog',
    templateUrl: './add-property-dialog.component.html',
    styleUrls: ['./add-property-dialog.component.css']
})

export class AddPropertyDialogComponent implements OnInit{
    types: string[];
    property: InterfaceField;

    constructor(
        public dialogRef: MatDialogRef<AddPropertyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public fields: { fields: any[] }
    ) {}

    ngOnInit() {
        this.types = ['string', 'select'];
        this.property = {
            required: false,
            type: 'string',
            name: undefined,
            options: undefined,
            isStatic: undefined,
        };
    }

    public onTypeChange(type) {
        this.property.options = type === 'select' ? [] : undefined;

    }

    public onAddOption() {
        this.property.options.push({
            displayName: undefined,
            value: undefined
        })
    }

    public onRemoveOption(index) {
        this.property.options.splice(index, 1);
    }

    public onCancel() {
        this.dialogRef.close();
    }

    public onAdd(form: NgForm) {
        if (form.valid) {
            this.dialogRef.close(this.property);
        }
    }
}