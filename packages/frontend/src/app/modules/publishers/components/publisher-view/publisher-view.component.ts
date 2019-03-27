import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Publisher} from '../../publisher.model';
import {PublisherService} from '../../publisher.service';
import {Campaign} from '../../../campaigns/campaign.model';
import {CampaignService} from '../../../campaigns/campaign.service';
import {ConfirmDialogComponent} from '../../../commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {AuthenticationService} from '../../../../core/authentication/authentication.service';
import {User} from '../../../../core/user/user.model';
import {CreateCampaignDialogComponent} from '../../../campaigns/components/dialogs/create-campaign-dialog/create-campaign-dialog.comonent';
import {SnackBarService} from '../../../commons/services/snack-bar.service';
import {LeadService} from '../../../leads/services/lead.service';
import {Lead} from '../../../leads/leads.model';

@Component({
    selector: 'app-publisher-view',
    templateUrl: './publisher-view.component.html',
    styleUrls: ['./publisher-view.component.css']
})

export class PublisherViewComponent implements OnInit {
    constructor(public publisherService: PublisherService,
                public campaignService: CampaignService,
                public leadService: LeadService,
                public dialog: MatDialog,
                private route: ActivatedRoute,
                private UserService: AuthenticationService,
                public snackBar: SnackBarService) {
    }

    publisherId: string;
    publisher$: Observable<Publisher>;
    campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);
    leads$: BehaviorSubject<Lead[]> = new BehaviorSubject([]);
    user: User;
    selectedCampaignId: string;

    ngOnInit() {
        // this.user = this.UserService.currentUserValue;
        this.route.params.subscribe((params: Params) => {
            this.publisherId = params['id'];
            this.publisher$ = this.publisherService.getPublisherById(this.publisherId);
            this.publisherService.getPublisherCampaigns(this.publisherId)
                .subscribe(campaigns => {
                    this.campaigns$.next(campaigns);
                });
        });
    }

    onPublisherChange(publisher) {
        this.publisher$ = this.publisherService.update(publisher._id, publisher);
    }

    onCreateCampaign(campaign: Campaign) {
        this.campaignService.create(this.publisherId, campaign)
            .subscribe(
                newCampaign => {
                    const campaigns = this.campaigns$.getValue();
                    campaigns.push(newCampaign);
                    this.campaigns$.next(campaigns);
                    this.snackBar.success('Campaign have been successfully created');
                },
                error => this._onError('Failed to create campaign', error)

            );
    }

    OnDeleteCampaign(campaign: Campaign) {
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
                            const campaigns = this.campaigns$.getValue().filter(function(c) {
                                return c._id !== campaign._id;
                            });
                            this.campaigns$.next(campaigns);
                            this.snackBar.success('Campaign have been successfully deleted');
                        },
                        error => this._onError('Failed to delete campaign', error)
                    );
            } else {
                console.log('Dialog Closed');
            }
        });
    }

    onEditCampaign(campaign: Campaign) {
        const dialogRef = this.dialog.open(CreateCampaignDialogComponent, {
            data: {campaign: campaign}
        });

        dialogRef.afterClosed().subscribe(editedCampaign => {
            if (editedCampaign) {
                this.campaignService.edit(editedCampaign)
                    .subscribe(
                        response => {
                            const campaigns = this.campaigns$.getValue();
                            const index = campaigns.findIndex(function(c) {
                                return c._id === campaign._id;
                            });
                            campaigns[index] = editedCampaign;
                            this.campaigns$.next(campaigns);
                            this.snackBar.success('Campaign have been successfully updated');

                        },
                        error => this._onError('Failed to edit campaign', error)
                    )
            }
        });
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
