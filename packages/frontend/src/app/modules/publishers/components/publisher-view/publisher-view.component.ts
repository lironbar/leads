import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Publisher} from '../../publisher.model';
import {PublisherService} from '../../publisher.service';
import {MatDialog} from '@angular/material';
import {SnackBarService} from '../../../commons/services/snack-bar.service';

@Component({
    selector: 'app-publisher-view',
    templateUrl: './publisher-view.component.html',
    styleUrls: ['./publisher-view.component.css']
})

export class PublisherViewComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        public publisherService: PublisherService,
        public dialog: MatDialog,
        public snackBar: SnackBarService
    ) {}

    publisherId: string;
    publisher$: Observable<Publisher>;

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.publisherId = params['id'];
            this.publisher$ = this.publisherService.getPublisherById(this.publisherId);
        });
    }

    onPublisherChange(publisher) {
        this.publisher$ = this.publisherService.update(publisher._id, publisher);
    }

}
