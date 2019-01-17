import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-page-forbidden',
    templateUrl: './page-forbidden.component.html',
    styleUrls: ['./page-forbidden.component.css']
})

export class PageForbiddenComponent {
    constructor(private _location: Location) {}
    onBack() {
        this._location.back();
    }
}
