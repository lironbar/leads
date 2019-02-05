import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Campaign} from '../../campaign.model';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-campaign-panels',
    templateUrl: './campaign-panels.component.html',
    styleUrls: ['./campaign-panels.component.css']
})

export class CampaignPanelsComponent implements OnInit {
    @Input() campaigns: Campaign[];
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() leave: EventEmitter<any> = new EventEmitter();
    ngOnInit() {}

    onDelete(campaign: Campaign) {
        this.delete.emit(campaign);
    }

    onLeave(campaign: Campaign) {
        this.leave.emit(campaign);
    }
}
