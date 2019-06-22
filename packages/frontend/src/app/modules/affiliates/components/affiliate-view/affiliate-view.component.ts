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
import { InterfaceService } from '../../../interface/interface.service';
import {LeadService} from '../../../leads/services/lead.service';
import {Lead} from '../../../leads/leads.model';

@Component({
    selector: 'app-affiliate-view',
    templateUrl: './affiliate-view.component.html',
    styleUrls: ['./affiliate-view.component.css']
})

export class AffiliateViewComponent implements OnInit {
    affiliateId: string;
    affiliate$: Observable<Affiliate>;
    campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);
    leads$: BehaviorSubject<Lead[]> = new BehaviorSubject([]);
    selectedCampaignId: string;
    user: User;
    constructor(
        public affiliateService: AffiliateService,
        public campaignService: CampaignService,
        public interfaceService: InterfaceService,
        public leadService: LeadService,
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

    onAffiliateChange(affiliate) {
        this.affiliate$ = this.affiliateService.update(affiliate._id, affiliate);
    }

    onSendLead(campaign: Campaign) {
        this.interfaceService.getByCampaign(campaign._id)
            .subscribe(
                campaignInterface => {
                    if (campaignInterface) {
                        const dialogRef = this.dialog.open(SendLeadDialogComponent, {data: campaignInterface.fields});
                        dialogRef.afterClosed().subscribe(lead => {
                            if (lead) {
                                this.leadService.sendLead(campaign._id, this.affiliateId, lead)
                                // this.campaignService.sendLead(campaign._id, this.affiliateId, lead)
                                    .subscribe(
                                        response => {
                                            this.snackBar.success('Lead sent successfully');
                                        },
                                        error => this._onError('Failed to get campaigns', error)
                                    )
                            } else {
                                console.log('Dialog Closed');
                            }
                        });
                    } else {
                        this._onError('No interface found', 'need to create one')
                    }
                },
                error => this._onError('Failed to get interface', error)
            )
    }

    onLeaveCampaign(campaign: Campaign) {
        this.campaignService.leave(campaign._id, this.affiliateId)
            .subscribe(
                response => {
                    let campaigns = this.campaigns$.getValue().filter(c => c._id !== campaign._id);
                    this.campaigns$.next(campaigns);
                    this.snackBar.success('Left campaign successfully');
                    this.selectedCampaignId = undefined;
                },
                error => this._onError('Failed to leave campaign', error)
            );
    }

    onSelectedCampaign(campaign: Campaign) {
        if (!this.selectedCampaignId || campaign._id !== this.selectedCampaignId) {
            this.selectedCampaignId = campaign._id;
            this.leadService.getLeadsByCampaign(campaign._id, 'false')
                .subscribe(leads => {
                    this.leads$.next(leads);
                })
        } else {
            this.selectedCampaignId = undefined;
            this.leads$.next([]);
        }
    }

    _onError(message, error) {
        console.error(message, error);
        this.snackBar.error(message);
    }
}

