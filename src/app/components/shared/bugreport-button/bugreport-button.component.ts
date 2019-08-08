import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { IconDefinition, faBug } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { BugReportModalComponent } from '../modals/bugreport-modal/bugreport-modal.component';

@Component({
    selector: 'bugreport-button',
    templateUrl: './bugreport-button.component.html',
    styleUrls: ['./bugreport-button.component.scss']
})
export class BugReportButtonComponent implements OnInit {
    public faBug:IconDefinition = faBug;

    constructor(private dialog: MatDialog) { }
    
    ngOnInit() {
    }
    clickReportBug() {
        this.dialog.open(BugReportModalComponent, {
            height: "70%",
            width: "60%",
        });
    }
}

