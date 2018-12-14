import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Campaign} from '../../campaign.model';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-campaign-panels',
    templateUrl: './campaign-panels.component.html',
    styleUrls: ['./campaign-panels.component.css']
})

export class CampaignPanelsComponent implements OnInit {
    @Input() campaigns$: Observable<Campaign[]>;
    @Output() delete: EventEmitter<any> = new EventEmitter();
    ngOnInit() {}


    onDelete(id) {
        this.delete.emit(id);
    }
}
