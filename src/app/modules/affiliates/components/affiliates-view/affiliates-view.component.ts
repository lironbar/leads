import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { Affiliate } from '../../affiliate.model';
import { AffiliateService } from '../../affiliates.service';

@Component({
    selector: 'app-affiliates-view',
    templateUrl: './affiliates-view.component.html',
    styleUrls: ['./affiliates-view.component.css']
})

export class AffiliatesViewComponent implements OnInit {
    affiliates$: Observable<Affiliate[]>;

    constructor(public affiliateService: AffiliateService) {
    }

    ngOnInit() {
        this.affiliates$ = this.affiliateService.getAll();
    }

    onCreateAffiliate(affiliate) {
        this.affiliateService.create(affiliate);
    }
}
