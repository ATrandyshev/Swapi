import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { map } from 'rxjs';
import { ResourcesQuery } from 'src/app/store/resource/resource.query';
import { tObservableResource } from 'src/app/models/TObservableResource';
import { IPlanet } from 'src/app/models/planet';
import { EResourceName } from 'src/app/data/EnumResourceName';
import { ResourceService } from 'src/app/store/resource/resource.service';
import { REGEXP_NUMBER } from 'src/app/data/constants';
import { stringMaxLength, stringToNumber } from 'src/app/supports/support';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-planet',
  templateUrl: './form-planet.component.html',
  styleUrls: ['./form-planet.component.scss'],
})
export class FormPlanetComponent implements OnInit {
  planetForm: FormGroup;
  selectResource$: tObservableResource;
  namePlanet: string;
  isEditing: boolean = false;

  constructor(
    private resService: ResourceService,
    private resQuery: ResourcesQuery,
    private route: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    public snackBar: MatSnackBar
  ) {
    this.route.params.subscribe((params) => {
      this.namePlanet = params['name'];
    });

    this._adapter.setLocale('ru-RU');

    this.planetForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      diameter: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      rotation_period: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      orbital_period: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      gravity: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      population: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      climate: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      terrain: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      surface_water: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      created: new FormControl(null, Validators.required),

      edited: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.selectResource$ = this.resQuery.selectPlanets$;
    this.selectResource$
      .pipe(
        map((e) =>
          e.filter((i) => {
            return i.name === this.namePlanet;
          })
        )
      )
      .subscribe((e) => {
        const planet: IPlanet = e[0] as IPlanet;
        this.planetForm.setValue({
          name: stringMaxLength(planet.name),
          diameter: stringToNumber(planet.diameter),
          rotation_period: stringToNumber(planet.rotation_period),
          orbital_period: stringToNumber(planet.orbital_period),
          gravity: stringMaxLength(planet.gravity),
          population: stringToNumber(planet.population),
          climate: stringMaxLength(planet.climate),
          terrain: stringMaxLength(planet.terrain),
          surface_water: stringToNumber(planet.surface_water),
          created: new Date(planet.created),
          edited: new Date(planet.edited),
        });
      });

    this.onClickChangeEditing();
  }

  openSnackBar() {
    this.snackBar.open('SAVED', 'close', {
      duration: 2000,
    });
  }

  onClickChangeEditing() {
    if (this.isEditing) {
      this.planetForm.enable();
    } else {
      this.planetForm.disable();
    }

    this.isEditing = !this.isEditing;
  }

  private update(form: FormGroup) {
    this.resService.updateResourceOnForm(form, EResourceName.planets);
  }

  submit() {
    this.update(this.planetForm);
  }
}
