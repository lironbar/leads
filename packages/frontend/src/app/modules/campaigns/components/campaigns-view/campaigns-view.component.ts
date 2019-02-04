import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Campaign} from '../../campaign.model';
import {CampaignService} from '../../campaign.service';
import {ConfirmDialogComponent} from '../../../commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {SnackBarService} from '../../../commons/services/snack-bar.service';
import {UsersService} from '../../../users/services/users.service';
import {User} from '../../../../core/user/user.model';
// import {AffiliateService} from '../../../affiliates/affiliates.service';


@Component({
    selector: 'app-campaigns-view',
    templateUrl: './campaigns-view.component.html',
    styleUrls: ['./campaigns-view.component.css']
})

export class CampaignsViewComponent implements OnInit {
    campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);
    affiliateId: string;

    constructor(
        public userService: UsersService,
        public campaignService: CampaignService,
        private snackBar: SnackBarService,
        public dialog: MatDialog) {
    }

    ngOnInit() {
        // this.campaignService.getCampaigns().subscribe(campaigns => this.campaigns$.next(campaigns));
        const user: User = this.userService.currentUserValue;
        this.affiliateId = user.currentRole.data._id;
        this.campaignService.getCampaignsByAffiliateId(this.affiliateId, false)
            .subscribe(campaigns => this.campaigns$.next(campaigns));
    }

    onJoinCampaign(campaign: Campaign) {
        this.campaignService.join(campaign._id, this.affiliateId)
            .subscribe(response => {

            });
    }

    onDeleteCampaign(campaign: Campaign) {
        const confirmDialogData = {
            header: 'Delete Campaign',
            text: 'Are you sure you want to delete this campaign?'
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: confirmDialogData});
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                this.campaignService.delete(campaign._id)
                    .subscribe(
                        deletedCampaign => {
                            let campaigns = this.campaigns$.getValue();
                            campaigns = campaigns.filter(function (c) {
                                return c._id !== campaign._id;
                            });
                            this.campaigns$.next(campaigns);
                            this.snackBar.success('Campaign have been successfully deleted');
                        },
                        error => {
                            console.error('Failed to delete campaign', error);
                            this.snackBar.error('Failed to delete campaign');
                        }
                    );
            } else {
                console.log('The dialog was closed');
            }
        });
    }
}
