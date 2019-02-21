import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Publisher} from '../../publisher.model';
import {CreatePublisherDialogComponent} from '../dialogs/create-publisher-dialog/create-publisher-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-publisher-info-bar',
    templateUrl: 'publisher-info-bar.component.html',
    styleUrls: ['publisher-info-bar.component.css']
})

export class PublisherInfoBarComponent {
    @Input() publisher: Publisher;
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor(
        private dialog: MatDialog
    ){}

    public onEditInfo(publisher: Publisher) {
        const publisherCopy = {...publisher};
        const dialogRef = this.dialog.open(CreatePublisherDialogComponent, {data: publisherCopy});
        dialogRef.afterClosed().subscribe(editedPublisher => {
            if (editedPublisher) {
                this.change.emit(editedPublisher)
            } else {
                console.log('Dialog Closed');
            }
        })
    }
}