import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'type-select',
  templateUrl: './type-select.component.html',
  styleUrls: ['./type-select.component.scss']
})
export class TypeSelectComponent implements OnInit {

  constructor() { }

  @Input("control") inputControl = new FormControl();
  @Input() options: string[] = [];
  @Input() placeholder: string;
  public disabled: boolean;
  filteredOptions: Observable<string[]>;

  public value;


  ngOnInit() {
    this.filteredOptions = this.inputControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    if(!value) return;
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
