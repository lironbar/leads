import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-lead-status-box',
    templateUrl: './lead-status-box.component.html',
    styleUrls: ['./lead-status-box.component.css']
})

export class LeadStatusBoxComponent {
    @Input() approved: boolean;
}