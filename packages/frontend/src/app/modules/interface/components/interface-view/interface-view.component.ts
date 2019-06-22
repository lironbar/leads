import {Component, OnInit} from '@angular/core';
import {CampaignService} from '../../../campaigns/campaign.service';
import {BehaviorSubject} from 'rxjs';
import {Campaign} from '../../../campaigns/campaign.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-interface-view',
    templateUrl: './interface-view.component.html',
    styleUrls: ['./interface-view.component.css']
})

export class InterfaceViewComponent implements OnInit{
    campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);
    selectedCampaignId: string;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public campaignsService: CampaignService
    ){}

    ngOnInit() {
        this.campaignsService.getCampaigns()
            .subscribe(campaigns => {
                this.campaigns$.next(campaigns);
                this.activatedRoute.params.subscribe((params: Params) => {
                    let campaignId = params['id'];

                    if (!campaignId) {
                        campaignId= campaigns.length ? campaigns[0]._id : undefined;
                    }

                    this.selectedCampaignId = campaignId;

                    if (this.selectedCampaignId) {
                        this.router.navigate(
                            [],
                            {
                                relativeTo: this.activatedRoute,
                                queryParams: { id: this.selectedCampaignId }
                            });
                    }
                });
            })
    }

    onCampaignClicked(campaign: Campaign) {
        this.selectedCampaignId = campaign._id;
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: { id: campaign._id }
            });
    }
}