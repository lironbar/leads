import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-campaigns-view',
  templateUrl: './campaigns-view.component.html',
  styleUrls: ['./campaigns-view.component.css']
})

export class CampaignsViewComponent {
  constructor(public dialog: MatDialog) {}

}
