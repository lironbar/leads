import {Component} from '@angular/core';
import {Lead} from '../../../leads/leads.model';
import {LeadService} from '../../../leads/services/lead.service';
import {SnackBarService} from '../../../commons/services/snack-bar.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-publisher-reports-view',
    templateUrl: './publisher-reports-view.component.html',
    styleUrls: ['./publisher-reports-view.component.css']
})

export class PublisherReportsViewComponent {

    leads: Lead[] = [];
    publisherId: string;

    constructor(
        public leadService: LeadService,
        public snackBar: SnackBarService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.publisherId = params['id'];
            this.leadService.getLeadsByPublishers([this.publisherId])
                .subscribe(
                    leads => {
                        this.leads = leads;
                    },
                    error => this._onError('Failed to get leads', error)
                )
        });
    }

    _onError(message, error) {
        console.error(message, error);
        this.snackBar.error(message);
    }

}