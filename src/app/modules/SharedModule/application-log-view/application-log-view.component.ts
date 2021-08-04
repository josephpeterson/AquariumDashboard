import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';

@Component({
  selector: 'application-log-view',
  templateUrl: './application-log-view.component.html',
  styleUrls: ['./application-log-view.component.scss']
})
export class ApplicationLogViewComponent implements OnInit {

  @Input("log") log: string;
  @ViewChild("scrollWindow", { static: false }) private scrollContainer: ElementRef;


  public filters = [
    {
      name: "Information",
      match: "INFO",
      value: true
    },
    {
      name: "Debug",
      match: "DEBUG",
      value: true
    },
    {
      name: "Errors",
      match: "ERROR",
      value: true
    },
    {
      name: "Warnings",
      match: "WARN",
      value: true
    }
  ]
  clearingLog: boolean;

  private _startBottom: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (!this._startBottom) {
      this._startBottom = true;
      this.scrollToBottom();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    //setTimeout(() => this.scrollToBottom(), 100);
  }
  scrollToBottom() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }


  getFilteredLog() {
    if (!this.log)
      return;
    var appliedFilters = [];
    for (var i in this.filters) {
      var filter = this.filters[i];
      if (filter.value)
        appliedFilters.push(`(${filter.match})`);
    }
    if (!appliedFilters.length)
      return;

    //All filters are on
    if (appliedFilters.map(f => f.value).length == this.filters.length) {
      return this.log;
    }
    var filterstr = appliedFilters.join("|");
    var reg = '^.*(\\|(' + filterstr + ').*$)';
    var regex = new RegExp(reg, 'gm');
    var matches = this.log.match(regex);
    if (matches)
      return matches.join("\n");
  }
}
