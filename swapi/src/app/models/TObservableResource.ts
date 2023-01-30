import { Observable } from 'rxjs';
import { IFilm } from './film';
import { IPeople } from './people';
import { IPlanet } from './planet';
import { ISpecies } from './species';
import { IStarship } from './starships';
import { IVehicles } from './vehicles';

export type tObservableResource = Observable<
  (IFilm | IPeople | IPlanet | ISpecies | IStarship | IVehicles)[]
>;
