import {Component, OnInit} from '@angular/core';
import {AffiliateService} from '../../affiliates.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Params} from '@angular/router';
import {Affiliate} from '../../affiliate.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Campaign} from '../../../campaigns/campaign.model';
import {User} from '../../../../core/user/user.model';
import {CampaignService} from '../../../campaigns/campaign.service';
import {SnackBarService} from '../../../commons/services/snack-bar.service';
import {CreateCampaignDialogComponent} from '../../../campaigns/components/dialogs/create-campaign-dialog/create-campaign-dialog.comonent';
import {SendLeadDialogComponent} from '../../../campaigns/components/dialogs/send-lead-dialog/send-lead-dialog.component';

@Component({
    selector: 'app-affiliate-view',
    templateUrl: './affiliate-view.component.html',
    styleUrls: ['./affiliate-view.component.css']
})

export class AffiliateViewComponent implements OnInit {
    affiliateId: string;
    affiliate$: Observable<Affiliate>;
    campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);
    user: User;
    constructor(
        public affiliateService: AffiliateService,
        public campaignService: CampaignService,
        public dialog: MatDialog,
        public snackBar: SnackBarService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        // this.user = this.userService.currentUserValue;
        this.route.params.subscribe((params: Params) => {
            this.affiliateId = params['id'];
            this.affiliate$ = this.affiliateService.getAffiliateById(this.affiliateId);

            this.affiliateService.getAffiliateCampaigns(this.affiliateId)
                .subscribe(
                    campaigns => this.campaigns$.next(campaigns),
                    error => this._onError('Failed to get campaigns', error)
                )
        });
    }

    onSendLead(campaign: Campaign) {
        const dialogRef = this.dialog.open(SendLeadDialogComponent);
        dialogRef.afterClosed().subscribe(lead => {
            if (lead) {

            } else {
                console.log('Dialog Closed');
            }
        });
    }

    onLeaveCampaign(campaign: Campaign) {
        this.campaignService.leave(campaign._id, this.affiliateId)
            .subscribe(
                response => {
                    let campaigns = this.campaigns$.getValue().filter(c => c._id !== campaign._id);
                    this.campaigns$.next(campaigns);
                    this.snackBar.success('Joined campaign successfully');
                },
                error => this._onError('Failed to leave campaign', error)
            );
    }

    _onError(message, error) {
        console.error(message, error);
        this.snackBar.error(message);
    }
}

