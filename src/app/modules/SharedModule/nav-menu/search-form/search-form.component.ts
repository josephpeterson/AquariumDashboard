import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchOptions } from 'src/app/models/SearchOptions';
import { AquariumService } from 'src/app/services/aquarium.service';
import { SearchResult } from 'src/app/models/SearchResult';
import $ from 'jquery';


@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @ViewChild("searchInput",{static: false}) searchInput: ElementRef;
  @ViewChild("form",{static: false}) searchForm: ElementRef;

  public icon_glass = faSearch;
  public active: boolean;
  public options: SearchOptions = new SearchOptions();
  public results: SearchResult[];
  public tick: any;

  constructor(public aquariumService: AquariumService) { }

  ngOnInit() {
  }

  public setSearchActive(val: boolean) {
    this.active = val;

    var evt = (event) => {
      var a = $(".omni-search-form").find($(event.target));
      if(a.length) return;

      this.setSearchActive(false);
      document.body.removeEventListener("click", evt);
    };
    document.body.removeEventListener("click", evt);
    document.body.addEventListener("click", evt);
  }
  public performSearch() {
    this.searchInput.nativeElement.focus();
    this.options.query = this.searchInput.nativeElement.value;
    this.aquariumService.performSearch(this.options).subscribe(results => {
      this.results = results;
    }, err => {

    });
  }
  public queueSearch() {
    clearTimeout(this.tick);
    return this.tick = setTimeout(() => {
      this.performSearch();
    }, 300);
  }
}
