import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { IconDefinition, faBug } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'loading-container',
    templateUrl: './loading-container.component.html',
    styleUrls: ['./loading-container.component.scss']
})
export class LoadingContainerComponent implements OnInit {
    public faBug:IconDefinition = faBug;

    constructor(private dialog: MatDialog) { }
    
    ngOnInit() {
    }
}

