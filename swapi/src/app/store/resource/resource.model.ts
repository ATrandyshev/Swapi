import { IFilm } from 'src/app/models/film';
import { IPeople } from 'src/app/models/people';
import { IPlanet } from 'src/app/models/planet';
import { ISpecies } from 'src/app/models/species';
import { IStarship } from 'src/app/models/starships';
import { IVehicles } from 'src/app/models/vehicles';

export interface Resource<
  T extends IFilm | IPeople | IPlanet | ISpecies | IStarship | IVehicles
> {
  films: T[];
  people: T[];
  planets: T[];
  species: T[];
  starships: T[];
  vehicles: T[];
}

export interface ResourceData {
  resources: Resource<
    IFilm | IPeople | IPlanet | ISpecies | IStarship | IVehicles
  >;
  loading: boolean;
}

export function createResource(params: Partial<ResourceData>) {
  return {} as ResourceData;
}
