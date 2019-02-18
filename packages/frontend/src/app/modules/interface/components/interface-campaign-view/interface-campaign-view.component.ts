import {Component, OnInit} from '@angular/core';
import {InterfaceService} from '../../interface.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Interface} from '../../interface.model';
import {SnackBarService} from '../../../commons/services/snack-bar.service';

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
        public interfaceService: InterfaceService,
        private snackBar: SnackBarService
    ) {}

    ngOnInit() {
        this.methods = ['POST', 'GET'];
        this.type = 'http';
        this.field = {};
        this.route.params.subscribe((params: Params) => {
            this.campaignId = params['id'];
            this.interfaceService.getByCampaign(this.campaignId)
                .subscribe(interfaceData => {
                    // debugger;
                    this.interface = interfaceData || this._getEmptyInterface();
                })
        })
    }

    public onTypeChange() {
        if (this.type === 'http') {
            this.interface = this._getEmptyInterface();
        } else {
            this.interface = {
                type: 'email'
            };
        }
    }

    public onAddField(field) {
        this.interface.properties.push(field);
        this.field = {}
    }

    public onRemoveField(index) {
        this.interface.properties.splice(index, 1);
    }

    public onCreate() {
        if (!this.interface.campaignId) {
            this.interface.campaignId = this.campaignId;
        }
        this.interfaceService.create(this.interface)
            .subscribe(
            createdInterface => {
                // const campaigns = this.campaigns$.getValue();
                // this.campaigns$.next(campaigns);
                this.interface._id = createdInterface._id;
                this.snackBar.success('Interface have been successfully created');
            },
            error => this._onError('Failed to create interface', error)

        );
    }

    public onUpdate() {
        if (!this.interface.campaignId) {
            this.interface.campaignId = this.campaignId;
        }
        this.interfaceService.update(this.interface._id, this.interface)
            .subscribe(
                updatedInterface => {
                    this.snackBar.success('Interface have been successfully updated');
                },
                error => this._onError('Failed to update interface', error)

            );
    }

    public onDelete() {
        this.interfaceService.delete(this.interface._id)
            .subscribe(
                response  => {
                    this.interface = this._getEmptyInterface();
                    this.snackBar.success('Interface have been successfully deleted');
                },
                error => this._onError('Failed to update interface', error)
            )
    }

    private _onError(message, error) {
        console.error(message, error);
        this.snackBar.error(message);
    }

    private _getEmptyInterface() {
        return {method: 'POST', properties: [], type: 'http'};
    }

}