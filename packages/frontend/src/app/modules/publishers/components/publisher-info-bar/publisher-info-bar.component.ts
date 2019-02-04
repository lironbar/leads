import {Component, Input} from '@angular/core';
import {Publisher} from '../../publisher.model';
import {User} from '../../../../core/user/user.model';

@Component({
    selector: 'app-publisher-info-bar',
    templateUrl: 'publisher-info-bar.component.html',
    styleUrls: ['publisher-info-bar.component.css']
})

export class PublisherInfoBarComponent {
    @Input() user: User;
    @Input() publisher: Publisher;
}