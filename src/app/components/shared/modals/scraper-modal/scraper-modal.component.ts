import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { AquariumService } from 'src/app/services/aquarium.service';
import { take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';

@Component({
  selector: 'scraper-modal',
  templateUrl: './scraper-modal.component.html',
  styleUrls: ['./scraper-modal.component.scss']
})
export class ScraperModalComponent implements OnInit {
  
  @Input("species") public originalSpecies: Species;

  constructor(private aquariumService: AquariumService) { }

  public loading: boolean;
  public species: Species;

  ngOnInit() {
    this.scrape(this.originalSpecies.website);
  }

  scrape(resource: string) {
    this.loading = true;

    this.aquariumService.scrapeSpecies(resource).pipe(take(1)).subscribe((scrapedResponse: any) => {
      var species = scrapedResponse.species;

      for(var key in species)
      {
        if(species[key] == this.originalSpecies[key])
          species[key] = undefined;
      }
      this.loading = false;
      this.species = species;
    });
  }
}