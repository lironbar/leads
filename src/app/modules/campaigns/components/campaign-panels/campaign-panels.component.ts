import {Component, OnInit, Input} from '@angular/core';
import {Campaign} from '../../campaign.model';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-campaign-panels',
    templateUrl: './campaign-panels.component.html',
    styleUrls: ['./campaign-panels.component.css']
})

export class CampaignPanelsComponent implements OnInit {
    @Input() campaigns$: Observable<Campaign[]>;
    ngOnInit() {}
}
