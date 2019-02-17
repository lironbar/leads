import {Component, OnInit} from '@angular/core';
import {InterfaceService} from '../../interface.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Interface} from '../../interface.model';

@Component({
    selector: 'app-interface-campaign-view',
    templateUrl: './interface-campaign-view.component.html',
    styleUrls: ['./interface-campaign-view.component.css']
})

export class InterfaceCampaignViewComponent implements OnInit{
    campaignId: string;
    type: string;
    methods: any[];
    field: {name?: string, defaultValue?: string};
    interface: Interface;

    constructor(
        private route: ActivatedRoute,
        public interfaceService: InterfaceService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.campaignId = params['id'];
            this.type = 'http';
            this.methods = ['POST', 'GET'];
            this.interface = {
                method: 'POST',
                properties: []
            };
            this.field = {};
        })
    }

    onTypeChange() {
        if (this.type === 'http') {
            this.interface = {
                method: 'POST',
                properties: []
            }
        } else {
            this.interface = {};
        }
    }

    onAddField(field) {
        this.interface.properties.push(field);
        this.field = {}
    }

    onRemoveField(index) {
        this.interface.properties.splice(index, 1);
    }

    onSubmit() {
        this.interfaceService.create(this.campaignId, this.interface)
            .subscribe(response => {

            });
    }

}