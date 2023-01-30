import { trigger, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IFilm } from 'src/app/models/film';
import { IPeople } from 'src/app/models/people';
import { IPlanet } from 'src/app/models/planet';
import { ISpecies } from 'src/app/models/species';
import { IStarship } from 'src/app/models/starships';
import { IVehicles } from 'src/app/models/vehicles';
import { ResourcesQuery } from 'src/app/store/resource/resource.query';
import { ResourceService } from 'src/app/store/resource/resource.service';
import { EResourceName } from 'src/app/data/EnumResourceName';

@Component({
  selector: 'app-cards-resource',
  templateUrl: './cards-resource.component.html',
  styleUrls: ['./cards-resource.component.scss'],
  animations: [
    trigger('animationAppearance', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1.2s', style({ opacity: 1 })),
      ]),
      transition('* => void', [animate('1.2s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CardsResourceComponent implements OnInit {
  resourceName: string;
  selectResource$: Observable<
    (IFilm | IPeople | IPlanet | ISpecies | IStarship | IVehicles)[]
  >;
  isLoading: boolean = false;

  constructor(
    private res: ResourceService,
    private resQuery: ResourcesQuery,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resQuery.selectLoading().subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('category')))
      .subscribe((category) => (this.resourceName = category));

    if (!this.resQuery.getHasCache()) {
      this.res.getResources(this.resourceName);
    }

    switch (this.resourceName) {
      case EResourceName.people:
        this.selectResource$ = this.resQuery.selectPeople$;
        break;
      case EResourceName.films:
        this.selectResource$ = this.resQuery.selectFilms$;
        break;
      case EResourceName.planets:
        this.selectResource$ = this.resQuery.selectPlanets$;
        break;
      case EResourceName.species:
        this.selectResource$ = this.resQuery.selectSpecies$;
        break;
      case EResourceName.starships:
        this.selectResource$ = this.resQuery.selectStarships$;
        break;
      case EResourceName.vehicles:
        this.selectResource$ = this.resQuery.selectVehicles$;
        break;
    }
  }
}
