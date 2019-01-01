import { Component } from '@angular/core';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})

export class PagesComponent {
    sidNavPosition = 'start'; // start/end
    tooltipDirection = 'after'; // 'after', 'before', 'above', 'below', 'left', 'right'
}
