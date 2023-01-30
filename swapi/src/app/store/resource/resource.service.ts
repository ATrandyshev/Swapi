import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { API } from 'src/app/data/api';
import { ResourceState, ResourceStore } from './resource.store';
import { IPeople } from 'src/app/models/people';
import { EResourceName } from 'src/app/data/EnumResourceName';
import { IFilm } from 'src/app/models/film';
import { IPlanet } from 'src/app/models/planet';
import { ISpecies } from 'src/app/models/species';
import { IStarship } from 'src/app/models/starships';
import { IVehicles } from 'src/app/models/vehicles';
import { IResponseResource } from 'src/app/models/requestResource';
import { FormGroup } from '@angular/forms';
import { MAX_COUNT_RESOURCES } from 'src/app/data/constants';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  constructor(
    private resourcesStore: ResourceStore,
    private http: HttpClient
  ) {}

  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.message);
  }

  getResources(resourceName: string): void {
    this.resourcesStore.setLoading(true);

    switch (resourceName) {
      case EResourceName.people:
        this.loadResource<IPeople>(API.people, EResourceName.people);
        break;
      case EResourceName.films:
        this.loadResource<IFilm>(API.films, EResourceName.films);
        break;
      case EResourceName.planets:
        this.loadResource<IPlanet>(API.planets, EResourceName.planets);
        break;
      case EResourceName.species:
        this.loadResource<ISpecies>(API.species, EResourceName.species);
        break;
      case EResourceName.starships:
        this.loadResource<IStarship>(API.starships, EResourceName.starships);
        break;
      case EResourceName.vehicles:
        this.loadResource<IVehicles>(API.vehicles, EResourceName.vehicles);
        break;
    }

    this.resourcesStore.setHasCache(true);
    this.resourcesStore.setLoading(false);
  }

  private loadResource<T>(
    api: string,
    resourceName: EResourceName,
    countResourcesDownloadable: number = MAX_COUNT_RESOURCES
  ): void {
    this.http
      .get<IResponseResource<T>>(api)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((entities: IResponseResource<T>) => {
        let res: T[] = [];

        for (let index = 0; index < countResourcesDownloadable; index++) {
          res.push(entities.results[index]);
        }

        this.updateResource(resourceName, res);
      });
  }

  private updateResource<T>(nameResource: string, res: T[]) {
    this.resourcesStore.update((state) => {
      const newState: ResourceState = {
        resources: {
          ...state.resources,
          [nameResource]: res,
        },

        loading: state.loading,
      };

      return newState;
    });
  }

  updateResourceOnForm(form: FormGroup, category: EResourceName) {
    let newResource;

    switch (category) {
      case EResourceName.people:
        newResource = this.resourcesStore
          .getValue()
          .resources.people.map((e) => {
            if (
              e.name ===
              (form.controls['name'].value ?? form.controls['title'].value)
            ) {
              return form.value;
            }

            return e;
          });
        break;

      case EResourceName.films:
        newResource = this.resourcesStore
          .getValue()
          .resources.films.map((e) => {
            if (e.title === form.controls['title'].value) {
              return form.value;
            }

            return e;
          });
        break;

      case EResourceName.planets:
        newResource = this.resourcesStore
          .getValue()
          .resources.planets.map((e) => {
            if (e.name === form.controls['name'].value) {
              return form.value;
            }

            return e;
          });
        break;

      case EResourceName.species:
        newResource = this.resourcesStore
          .getValue()
          .resources.species.map((e) => {
            if (
              e.name ===
              (form.controls['name'].value ?? form.controls['title'].value)
            ) {
              return form.value;
            }

            return e;
          });
        break;

      case EResourceName.starships:
        newResource = this.resourcesStore
          .getValue()
          .resources.starships.map((e) => {
            if (
              e.name ===
              (form.controls['name'].value ?? form.controls['title'].value)
            ) {
              return form.value;
            }

            return e;
          });
        break;

      case EResourceName.vehicles:
        newResource = this.resourcesStore
          .getValue()
          .resources.vehicles.map((e) => {
            if (
              e.name ===
              (form.controls['name'].value ?? form.controls['title'].value)
            ) {
              return form.value;
            }

            return e;
          });
        break;
    }

    this.updateResource(category, newResource);
  }
}
