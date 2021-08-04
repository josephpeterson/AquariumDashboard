import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource, MatDialogRef } from '@angular/material';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'select-schedule-modal',
  templateUrl: './select-schedule-modal.component.html',
  styleUrls: ['./select-schedule-modal.component.scss']
})
export class SelectScheduleModalComponent implements OnInit {
  public device: AquariumDevice;
  public loading: boolean;
  public dataSource: MatTableDataSource<DeviceSchedule> = new MatTableDataSource<DeviceSchedule>();


  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  public columns: Array<any> = [
    { name: 'select', visible: false },
    { name: 'id', label: "ID", visible: false },
    { name: 'name', label: 'Aquarium Name', visible: true },
    { name: 'gallons', label: 'Size (Gal.)', visible: true },
    { name: 'age', label: 'Age', visible: true },
    { name: 'monitored', label: 'Monitoring', visible: true },
  ];

  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);

  constructor(@Inject(MAT_DIALOG_DATA) private data,
  private _self: MatDialogRef<SelectScheduleModalComponent>,
  private _aquariumService: AquariumService)
  {
    this.device = {...data}
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.load();
  }

  load() {
    this.loading = true;

    this._aquariumService.getDeviceSchedules().subscribe((data:DeviceSchedule[]) => {
      this.loading = false;

      data = data.filter(d => {
        var add = this.device.scheduleAssignments.filter(s => s.scheduleId == d.id).length > 0;
        return !add;
      });
      this.dataSource.data = data;
    },err => {
      this.loading = false;
    });
  }

  rowClickHandler(event: MouseEvent,row: DeviceSchedule) {
    this._self.close(row);
  }

}
