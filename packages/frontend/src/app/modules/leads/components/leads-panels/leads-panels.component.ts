import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Lead} from '../../leads.model';

@Component({
    selector: 'app-leads-panels',
    templateUrl: './leads-panels.component.html'
})

export class LeadsPanelsComponent {
    @Input() leads: Lead[];
    objectKeys = Object.keys;

}