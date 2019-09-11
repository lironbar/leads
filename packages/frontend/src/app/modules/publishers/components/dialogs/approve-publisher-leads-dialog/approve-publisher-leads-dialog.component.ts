import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApproveLeadsResultsModel} from "../../../approve-leads-results.model";

@Component({
    selector: 'app-approve-publisher-leads-dialog',
    templateUrl: './approve-publisher-leads-dialog.component.html',
    styleUrls: ['./approve-publisher-leads-dialog.component.css']
})

export class ApprovePublisherLeadsDialogComponent implements OnInit{

    constructor(
        public dialogRef: MatDialogRef<ApprovePublisherLeadsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public results: ApproveLeadsResultsModel
    ) {}

    ngOnInit() {}

    public onCancel() {
        this.dialogRef.close();
    }

    public onDone(rejectedLeads?: any[]) {
        this.dialogRef.close(rejectedLeads);
    }


}