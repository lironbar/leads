import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Publisher} from '../../publisher.model';
import {PublisherService} from '../../publisher.service';
import {flatMap, map, switchMap, filter, catchError, tap} from 'rxjs/operators';
import {Campaign} from '../../../campaigns/campaign.model';
import {CampaignService} from '../../../campaigns/campaign.service';
import {ConfirmDialogComponent} from '../../../commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {MatSnackBar} from '@angular/material';


@Component({
    selector: 'app-publisher-view',
    templateUrl: './publisher-view.component.html',
    styleUrls: ['./publisher-view.component.css']
})

export class PublisherViewComponent implements OnInit {
    constructor(public publisherService: PublisherService, public campaignService: CampaignService,
                public dialog: MatDialog, private route: ActivatedRoute, public snackBar: MatSnackBar) {
    }

    publisherId: string;
    publisher$: Observable<Publisher>;
    campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.publisherId = params['id'];
            this.publisher$ = this.publisherService.getPublisherById(this.publisherId);
            this.publisherService.getPublisherCampaigns(this.publisherId)
                .subscribe(campaigns => {
                    this.campaigns$.next(campaigns);
                });
        });

        // this.campaigns$ = this.publisher$.pipe(
        //   map(publisher => publisher.campaigns)
        // );
    }

    onCreateCampaign(campaign: Campaign) {
        this.campaignService.create(this.publisherId, campaign)
            .subscribe(newCampaign => {
                const campaigns = this.campaigns$.getValue();
                campaigns.push(newCampaign);
                this.campaigns$.next(campaigns);
            });
    }

    OnDeleteCampaign(campaign) {
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
                });
            } else {
                console.log('The dialog was closed');
            }
        });
    }

}
