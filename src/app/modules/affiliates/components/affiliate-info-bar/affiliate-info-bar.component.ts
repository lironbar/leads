import {Component, Input} from '@angular/core';
import {Affiliate} from '../../affiliate.model';

@Component({
    selector: 'app-affiliate-info-bar',
    templateUrl: 'affiliate-info-bar.component.html',
    styleUrls: ['affiliate-info-bar.component.css']
})

export class AffiliateInfoBarComponent {
    @Input() affiliate: Affiliate;
}
