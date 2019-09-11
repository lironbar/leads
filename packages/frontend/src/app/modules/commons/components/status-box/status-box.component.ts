import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-status-box',
    templateUrl: './status-box.component.html',
    styleUrls: ['./status-box.component.css']
})

export class StatusBoxComponent {
    @Input() status: string;
    @Input() sum: string;
}