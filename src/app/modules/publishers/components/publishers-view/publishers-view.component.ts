import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Publisher} from '../../publisher.model';
import {PublisherService} from '../../publisher.service';
import {ConfirmDialogComponent} from '../../../commons/components/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-publishers-view',
    templateUrl: './publishers-view.component.html',
    styleUrls: ['./publishers-view.component.css']
})

export class PublishersViewComponent implements OnInit {
    publishers$: Observable<Publisher[]>;

    constructor(public publisherService: PublisherService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.publishers$ = this.publisherService.getAll(true);
    }

    onCreatePublisher(publisher) {
        this.publisherService.create(publisher);
    }

    onDeletePublisher(publisher) {
        const confirmDialogData = {
            header: 'Delete Publisher',
            text: 'Are you sure you want to delete this publisher?'
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: confirmDialogData});
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                this.publisherService.delete(publisher._id);
            } else {
                console.log('The dialog was closed');
            }
        });
    }

    }
