import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Campaign} from '../../campaign.model';
import {CampaignService} from '../../campaign.service';
import {ConfirmDialogComponent} from '../../../commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';


@Component({
    selector: 'app-campaigns-view',
    templateUrl: './campaigns-view.component.html',
    styleUrls: ['./campaigns-view.component.css']
})

export class CampaignsViewComponent implements OnInit {
    campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);

    constructor(public campaignService: CampaignService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.campaignService.getCampaigns().subscribe(campaigns => this.campaigns$.next(campaigns));
    }

    onDeleteCampaign(campaign: Campaign) {
        const confirmDialogData = {
            header: 'Delete Campaign',
            text: 'Are you sure you want to delete this campaign?'
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: confirmDialogData});
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                this.campaignService.delete(campaign._id).subscribe(deletedCampaign => {
                    let campaigns = this.campaigns$.getValue();
                    campaigns = campaigns.filter(function(c) {
                        return c._id !== campaign._id;
                    });
                    this.campaigns$.next(campaigns);
                })
            } else {
                console.log('The dialog was closed');
            }
        });
    }
}
