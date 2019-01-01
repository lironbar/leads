import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(
            'affiliate-join', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/affiliate-join.svg'));
        this.matIconRegistry.addSvgIcon(
            'affiliate-main', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/group.svg'));

    }
}
