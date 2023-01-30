import { Injectable } from '@angular/core';
import { ResourceData } from './resource.model';
import { StoreConfig, Store } from '@datorama/akita';

export interface ResourceState extends ResourceData {}

export function createInitialState(): ResourceState {
  return {
    resources: {
      films: [],
      people: [],
      planets: [],
      species: [],
      starships: [],
      vehicles: [],
    },
    loading: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'resources' })
export class ResourceStore extends Store<ResourceState> {
  constructor() {
    super(createInitialState());
  }
}
