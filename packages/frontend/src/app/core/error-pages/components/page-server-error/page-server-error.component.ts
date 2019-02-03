import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-page-server-error',
    templateUrl: './page-server-error.component.html',
    styleUrls: ['./page-server-error.component.css']
})

export class PageServerErrorComponent {
    constructor(private _location: Location) {}
    onBack() {
        this._location.back();
    }
}
