import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapshotListComponent } from './snapshot-list/snapshot-list.component';
import { MaintenanceRoutingModule } from './maintenance.routing.module';
import { MatTableModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
    declarations: [SnapshotListComponent],
    imports: [
        CommonModule,

        //Material modules
        MatTableModule,
        MatProgressSpinnerModule,

        //Maintenance modules
        MaintenanceRoutingModule
    ]
})
export class MaintenanceModule { }