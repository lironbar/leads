import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Affiliate} from '../../affiliate.model';
import {MatDialog} from '@angular/material';
import {CreateAffiliateDialogComponent} from '../dialogs/create-affiliate-dialog/create-affiliate-dialog.component';

@Component({
    selector: 'app-affiliate-info-bar',
    templateUrl: 'affiliate-info-bar.component.html',
    styleUrls: ['affiliate-info-bar.component.css']
})

export class AffiliateInfoBarComponent {
    @Input() affiliate: Affiliate;
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor(
        private dialog: MatDialog
    ){}

    public onEditInfo(affiliate: Affiliate) {
        const affiliateCopy = {...affiliate};
        const dialogRef = this.dialog.open(CreateAffiliateDialogComponent, {data: affiliateCopy});
        dialogRef.afterClosed().subscribe(editedAffiliate => {
            if (editedAffiliate) {
                this.change.emit(editedAffiliate)
            } else {
                console.log('Dialog Closed');
            }
        })
    }
}
