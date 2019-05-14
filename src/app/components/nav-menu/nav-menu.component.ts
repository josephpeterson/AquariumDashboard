import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium, isLoading, selectAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AquariumLoadAction, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;

  public aquariumId: number;
  public aquarium: Aquarium;
  public loading = this.store.pipe(select(isLoading));
  public aquariums = this.store.pipe(select(selectAquarium));


  constructor(private store: Store<AppState>,
    private route: ActivatedRoute  ) { }

  collapse() {
    this.isExpanded = false;
  }

  ngOnInit() {
    this.store.dispatch(new AquariumLoadAction());

    this.loading.subscribe(loading => {
      if(!loading)
      {
        //Needs to go once its loaded
        this.store.dispatch(new AquariumSelectionAction(this.aquariumId));
      }
    })
    this.route.params.subscribe(p => {
      this.aquariumId = p.aqId;
    });
    
    this.store.select(getSelectedAquarium).subscribe(a => {
      this.aquarium = a;
    });
  }


  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
