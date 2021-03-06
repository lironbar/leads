import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {Campaign} from '../../campaign.model';
import {AffiliateService} from '../../../affiliates/affiliates.service';

@Component({
    selector: 'app-campaign-list',
    templateUrl: './campaign-list.component.html',
    styleUrls: ['./campaign-list.component.css']
})

export class CampaignListComponent {
    @Input() campaigns: Campaign[];
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() join: EventEmitter<any> = new EventEmitter();
    @Output() send: EventEmitter<any> = new EventEmitter();
    defaultImageUrl = 'https://www.jensenleisurefurniture.com/wp-content/themes/jensen-leisure/media/woocommerce/product-placeholder.png';

    constructor(public dialog: MatDialog) {
    }

    onDelete(campaign: Campaign) {
        this.delete.emit(campaign);
    }

    onJoin(campaign: Campaign) {
        this.join.emit(campaign);
    }

}
