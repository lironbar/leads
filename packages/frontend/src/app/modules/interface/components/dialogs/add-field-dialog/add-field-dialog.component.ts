import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {InterfaceField} from '../../../interface.model';

@Component({
    selector: 'app-add-field-dialog',
    templateUrl: './add-field-dialog.component.html',
    styleUrls: ['./add-field-dialog.component.css']
})

export class AddFieldDialogComponent implements OnInit{
    types: string[];
    field: InterfaceField;

    constructor(
        public dialogRef: MatDialogRef<AddFieldDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public fields: { fields: any[] }
    ) {}

    ngOnInit() {
        this.types = ['string', 'select'];
        this.field = {
            type: 'string',
            name: undefined,
            options: undefined,
            isStatic: false,
            isRequired: false,
            isPhoneNumber: false,
            isName: false
        };
    }

    public onTypeChange(type) {
        this.field.options = type === 'select' ? [this._getEmptyOption()] : undefined;
    }

    public onAddOption() {
        let emptyOption = this._getEmptyOption();
        this.field.options.push(emptyOption)
    }

    public onRemoveOption(index) {
        this.field.options.splice(index, 1);
    }

    public onCancel() {
        this.dialogRef.close();
    }

    public onAdd(form: NgForm) {
        if (form.valid) {
            this.dialogRef.close(this.field);
        }
    }

    public onIsRequiredChange(event, index, field) {
        field.isRequired = !field.isRequired;
        if (field.isRequired) {
            field.isStatic = false;
        }
    }

    public onIsStaticChange(event, index, field) {
        field.isStatic = !field.isStatic;
        if (field.isStatic) {
            field.isRequired = false;
        }
    }





    public onIsNameChange(event, index, field) {
        field.isName = !field.isName;
        if (field.isName) {
            field.isPhoneNumber = false;
        }
    }

    public onisPhoneNumberChange(event, index, field) {
        field.isPhoneNumber = !field.isPhoneNumber;
        if (field.isPhoneNumber) {
            field.isName = false;
        }
    }

    /////////////////////////////
    //     Private Methods    //
    /////////////////////////////
    private _getEmptyOption() {
        return {
            name: undefined,
            value: undefined
        }
    }
}