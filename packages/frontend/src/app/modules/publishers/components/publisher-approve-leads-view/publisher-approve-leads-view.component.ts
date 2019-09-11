import {Component, OnInit} from '@angular/core';
import {LeadService} from '../../../leads/services/lead.service';
import * as XLSX from 'xlsx';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ApprovePublisherLeadsDialogComponent} from "../dialogs/approve-publisher-leads-dialog/approve-publisher-leads-dialog.component";

@Component({
    selector: 'app-publisher-approve-leads-view',
    templateUrl: './publisher-approve-leads-view.component.html',
    styleUrls: ['./publisher-approve-leads-view.component.css']
})

export class PublisherApproveLeadsViewComponent implements OnInit {

    leads = [];
    stats: {};
    publisherId: string;

    constructor(
        private router: Router,
        private leadService: LeadService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            this.publisherId = params.id;
        });
    }

    onFileChange(ev) {
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        const file = ev.target.files[0];
        reader.onload = (event) => {
            const data = reader.result;
            workBook = XLSX.read(data, { type: 'binary' });
            jsonData = workBook.SheetNames.reduce((initial, name) => {
                const sheet = workBook.Sheets[name];
                const leads = XLSX.utils.sheet_to_json(sheet);
                // initial[name] = XLSX.utils.sheet_to_json(sheet);
                this.leads = leads;
                this._setStats(leads);

                return initial;
            }, {});
        };
        reader.readAsBinaryString(file);
    }

    onRemoveLead(i) {
        this.leads.splice(i, 1);
        this._setStats(this.leads);
    }

    onDone() {
        this.leadService.approve(this.leads, this.publisherId)
            .subscribe(res => {
                const dialogRef = this.dialog.open(ApprovePublisherLeadsDialogComponent, {data: res});
                dialogRef.afterClosed().subscribe(leads => {
                    if (leads && leads.length) {
                        leads = leads.map(l => {
                            return l.approval;
                        });
                        this.leads = leads;
                        this._setStats(leads)
                    } else {
                        this.leads = [];
                    }
                });
            })
    }

    onBack() {
        this.stats = undefined;
        this.leads = [];
        this.router.navigate(['../campaigns'], { relativeTo: this.route });
    }

    onCancel() {
        this.stats = undefined;
        this.leads = [];
    }

    private _setStats(leads) {
        let stats = {
            approved: 0,
            rejected: 0
        };
        leads.forEach(function(l, i) {
            if (l.isApproved) {
                stats.approved++
            } else {
                stats.rejected++
            }
        });
        this.stats = stats;
    }

}