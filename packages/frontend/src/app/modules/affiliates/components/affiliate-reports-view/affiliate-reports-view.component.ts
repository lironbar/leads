import {Component, OnInit} from '@angular/core';
import {LeadService} from '../../../leads/services/lead.service';
import {ActivatedRoute, Params} from '@angular/router';
import {SnackBarService} from '../../../commons/services/snack-bar.service';
import {Lead} from '../../../leads/leads.model';

@Component({
    selector: 'app-affiliate-reports-view',
    templateUrl: './affiliate-reports-view.component.html',
    styleUrls: ['./affiliate-reports-view.component.css']
})

export class AffiliateReportsViewComponent implements OnInit{
    leads: Lead[] = [];
    affiliateId: string;

    constructor(
        public leadService: LeadService,
        public snackBar: SnackBarService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.affiliateId = params['id'];
            this.leadService.getLeadsByAffiliates([this.affiliateId])
                .subscribe(
                    leads => this.leads = leads,
                    error => this._onError('Failed to get leads', error)
                )
        });
    }

    _onError(message, error) {
        console.error(message, error);
        this.snackBar.error(message);
    }


}
