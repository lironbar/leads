import {Component} from '@angular/core';
import {InterfaceService} from '../../interface.service';

@Component({
    selector: 'app-interface-create-view',
    templateUrl: './interface-create-view.component.html',
    styleUrls: ['./interface-create-view.component.css']
})

export class InterfaceCreateViewComponent {

    type: string = 'api';
    selectedFeild: string;
    payload = {
        path: 'some path',
        properties: []
    };
    allFileds = [
        'name',
        'phone',
        'email'
    ];
    Feilds = [...this.allFileds];

    constructor(public interfaceService: InterfaceService) {
    }

    onAddProperty(selectedFeild) {
        this.payload.properties.push(
            {key: selectedFeild.value, value: undefined}
        );
        this.Feilds = this.Feilds.filter(f => {
            return f !== selectedFeild.value;
        })
    }

    onSubmit() {
        this.interfaceService.create('testId', this.payload)
            .subscribe(response => {
                debugger;
            })
    }

}