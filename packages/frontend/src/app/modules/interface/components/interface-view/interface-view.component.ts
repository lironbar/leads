import {Component, OnInit} from '@angular/core';
import {CampaignService} from '../../../campaigns/campaign.service';
import {BehaviorSubject} from 'rxjs';
import {Campaign} from '../../../campaigns/campaign.model';
import {Router} from '@angular/router';

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
        public campaignsService: CampaignService
    ){}

    ngOnInit() {
        this.campaignsService.getCampaigns()
            .subscribe(campaigns => {
                this.campaigns$.next(campaigns);
                if (campaigns.length) {
                    this.selectedCampaignId = campaigns[0]._id;
                    this.router.navigate(['interface/campaign', campaigns[0]._id]);
                }
            })
    }

    onCampaignClicked(campaign: Campaign) {
        this.selectedCampaignId = campaign._id;
    }
}