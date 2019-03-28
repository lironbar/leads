import {Component, Input} from '@angular/core';
import {LeadService} from '../../services/lead.service';

@Component({
    selector: 'app-lead-status-box',
    templateUrl: './lead-status-box.component.html',
    styleUrls: ['./lead-status-box.component.css']
})

export class LeadStatusBoxComponent {
    @Input() leadId: string;
    @Input() approved: boolean;

    constructor(private leadService: LeadService) {}

    onChangeApproved(currentValue: boolean) {
        this.leadService.changeLeadApproveStatus(this.leadId, currentValue)
            .subscribe(updatedStatus => {
                this.approved = updatedStatus;
            })
    }
}