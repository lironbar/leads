import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {InterfaceService} from '../../interface.service';
import {ActivatedRoute} from '@angular/router';
import {Interface} from '../../interface.model';
import {SnackBarService} from '../../../commons/services/snack-bar.service';
import {MatDialog} from '@angular/material';
import {AddFieldDialogComponent} from '../dialogs/add-field-dialog/add-field-dialog.component';

@Component({
    selector: 'app-interface-campaign-view',
    templateUrl: './interface-campaign-view.component.html',
    styleUrls: ['./interface-campaign-view.component.css']
})

export class InterfaceCampaignViewComponent implements OnInit, OnChanges{

    @Input() campaignId: string;

    // campaignId: string;
    methods: any[];
    interface: Interface = this._getEmptyInterface();

    constructor(
        private route: ActivatedRoute,
        public interfaceService: InterfaceService,
        private snackBar: SnackBarService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.methods = ['POST', 'GET'];
        this.interfaceService.getByCampaign(this.campaignId)
            .subscribe(interfaceData => {
                this.interface = interfaceData || this._getEmptyInterface();
            })
    }
    ngOnChanges(changes) {
        if (changes.campaignId && !changes.campaignId.isFirstChange()) {
            this.interfaceService.getByCampaign(this.campaignId)
                .subscribe(interfaceData => {
                    this.interface = interfaceData || this._getEmptyInterface();
                })
        }
    }

    public onTypeChange(type) {
        this.interface.type = type;
    }

    public onAddField() {
        const dialogRef = this.dialog.open(AddFieldDialogComponent);
        dialogRef.afterClosed().subscribe(field => {
           if (field) {
               if (!this.interface.fields) {
                   this.interface.fields = [];
               }
               if (field.isName) {
                   this.interface.fields.forEach(f => {
                       f.isName = undefined;
                   })
               }
               if (field.isPhoneNumber) {
                   this.interface.fields.forEach(f => {
                       f.isPhoneNumber = undefined;
                   })
               }
               this.interface.fields.unshift(field);
           }
        });
    }

    public onFieldIsRequiredChange(event, index, field) {
        if (field.isRequired) {
            field.isStatic = false;
        }
    }

    public onFieldIsStaticdChange(event, index, field) {
        if (field.isStatic) {
            field.isRequired = false;
        }
    }

    public onFieldIsNameChange(event, index, field) {
        if (field.isName) {
            this.interface.fields.forEach(f => {
                f.isName = undefined;
            });
            field.isName = true;
            field.isPhoneNumber = undefined;
        }
    }

    public onFieldisPhoneNumberChange(event, index, field) {
        if (field.isPhoneNumber) {
            this.interface.fields.forEach(f => {
                f.isPhoneNumber = undefined;
            });
            field.isPhoneNumber = true;
            field.isName = undefined;
        }
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
                this.interface = createdInterface;
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
                interfaceData  => {
                    this.interface = interfaceData;
                    this.snackBar.success('Interface have been successfully deleted');
                },
                error => this._onError('Failed to update interface', error)
            )
    }

    private _getEmptyInterface() {
        return {
            type: 'http',
            method: 'POST',
            fields: []
        };
    }

    private _onError(message, error) {
        console.error(message, error);
        this.snackBar.error(message);
    }

}