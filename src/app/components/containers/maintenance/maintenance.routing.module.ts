import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { SnapshotListComponent } from './snapshot-list/snapshot-list.component';

const routes: Routes = [
    {
        path: 'maintenance',
        component: MaintenanceComponent,
        children: [
            {
                path: "**",
                component: SnapshotListComponent
            },
            {
                path: 'tasks',
                component: SnapshotListComponent
            },
            {
                path: 'feeding',
                component: SnapshotListComponent
            },
            {
                path: 'parameters',
                component: SnapshotListComponent
            },
            {
                path: 'notifications',
                component: SnapshotListComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule { }