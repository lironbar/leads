import {Component, Input} from '@angular/core';
import {Publisher} from '../../publisher.model';

@Component({
    selector: 'app-publisher-info-bar',
    templateUrl: 'publisher-info-bar.component.html',
    styleUrls: ['publisher-info-bar.component.css']
})

export class PublisherInfoBarComponent {
    @Input() publisher: Publisher;
}