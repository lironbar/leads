import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {PublisherService} from '../../publisher.service';
import {ConfirmDialogComponent} from '../../../commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {Publisher} from '../../publisher.model';

@Component({
    selector: 'app-publishers-table',
    templateUrl: './publishers-table.component.html',
    styleUrls: ['./publishers-table.component.css']
})

export class PublishersTableComponent {
    @Input() publishers: Publisher[];
    @Output() delete: EventEmitter<any> = new EventEmitter();
    displayedColumns: string[] = ['index', 'name', 'phone', 'address', 'campaigns', 'actions'];

    constructor(public publisherService: PublisherService, public dialog: MatDialog) {
    }

    onRemove(publisher) {
        this.delete.emit(publisher);
    }
}
