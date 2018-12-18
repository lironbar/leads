import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    sidNavPosition = 'start'; // start/end
    tooltipDirection = 'after'; // 'after', 'before', 'above', 'below', 'left', 'right'
}
