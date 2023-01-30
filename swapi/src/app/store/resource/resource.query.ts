import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ResourceStore, ResourceState } from './resource.store';

@Injectable({ providedIn: 'root' })
export class ResourcesQuery extends Query<ResourceState> {
  selectFilms$ = this.select((state) => state.resources.films);
  selectPeople$ = this.select((state) => state.resources.people);
  selectPlanets$ = this.select((state) => state.resources.planets);
  selectSpecies$ = this.select((state) => state.resources.species);
  selectStarships$ = this.select((state) => state.resources.starships);
  selectVehicles$ = this.select((state) => state.resources.vehicles);

  constructor(protected override store: ResourceStore) {
    super(store);
  }
}
