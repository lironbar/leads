import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Campaign} from '../../campaign.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-campaign-panels',
    templateUrl: './campaign-panels.component.html',
    styleUrls: ['./campaign-panels.component.css']
})

export class CampaignPanelsComponent implements OnInit {
    isAffiliateActions: boolean;
    @Input() campaigns: Campaign[];
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() leave: EventEmitter<any> = new EventEmitter();
    @Output() edit: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router) {}

    ngOnInit() {
        this.isAffiliateActions = this.router.url.includes('affiliates');
    }

    onDelete(campaign: Campaign) {
        this.delete.emit(campaign);
    }

    onLeave(campaign: Campaign) {
        this.leave.emit(campaign);
    }

    onEdit(campaign: Campaign) {
        this.edit.emit(campaign)
    }
}