import {Component, OnInit} from '@angular/core';
import {AffiliateService} from '../../affiliates.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Params} from '@angular/router';
import {Affiliate} from '../../affiliate.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Campaign} from '../../../campaigns/campaign.model';

@Component({
    selector: 'app-affiliate-view',
    templateUrl: './affiliate-view.component.html',
    styleUrls: ['./affiliate-view.component.css']
})

export class AffiliateViewComponent implements OnInit {
    affiliateId: string;
    affiliate$: Observable<Affiliate>;
    campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);
    constructor(public affiliateService: AffiliateService, public dialog: MatDialog, private route: ActivatedRoute) {}
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.affiliateId = params['id'];
            this.affiliate$ = this.affiliateService.getAffiliateById(this.affiliateId);

            this.affiliateService.getAffiliateCampaigns(this.affiliateId)
                .subscribe(campaigns => this.campaigns$.next(campaigns));
        });
    }
}

