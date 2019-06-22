import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {InterfaceService} from '../../interface.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Interface} from '../../interface.model';
import {SnackBarService} from '../../../commons/services/snack-bar.service';
import {MatDialog} from '@angular/material';
import {AddPropertyDialogComponent} from '../dialogs/add-property-dialog/add-property-dialog.component';

@Component({
    selector: 'app-interface-campaign-view',
    templateUrl: './interface-campaign-view.component.html',
    styleUrls: ['./interface-campaign-view.component.css']
})

export class InterfaceCampaignViewComponent implements OnInit{
    campaignId: string;
    type: string;
    methods: any[];
    field: {name?: string, value?: string, isStatic?: boolean};
    interface: Interface = {
        fields: []
    };

    constructor(
        private route: ActivatedRoute,
        public interfaceService: InterfaceService,
        private snackBar: SnackBarService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.methods = ['POST', 'GET'];
        this.field = {isStatic: false};
        this.route.params.subscribe((params: Params) => {
            this.campaignId = params['id'];
            this.interfaceService.getByCampaign(this.campaignId)
                .subscribe(interfaceData => {
                    this.type = interfaceData && interfaceData.type ? interfaceData.type : 'http';
                    this.interface = this._getInterface(interfaceData || {}, this.type);
                })
        })
    }

    public onTypeChange(type) {
        this.interface.type = type;
    }

    public onAddField(field) {
        const dialogRef = this.dialog.open(AddPropertyDialogComponent);
        dialogRef.afterClosed().subscribe(field => {
           if (field) {
               this.interface.fields.push(field);
           }
        });
        // this.interface.properties.push(field);
        // this.field = {isStatic: false}
    }

    public onRemoveField(index) {
        this.interface.fields.splice(index, 1);
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
                    this.interface = this._getInterface({}, this.type);
                    this.snackBar.success('Interface have been successfully deleted');
                },
                error => this._onError('Failed to update interface', error)
            )
    }

    private _onError(message, error) {
        console.error(message, error);
        this.snackBar.error(message);
    }

    private _getInterface(interfaceData, type: string) {
        return {
            _id: interfaceData._id,
            campaignId: interfaceData.campaignId,
            type: type,
            url: interfaceData.url,
            method: interfaceData.method || 'POST',
            email: interfaceData.email,
            fields: interfaceData.fields || []
        };
    }

}