import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { map } from 'rxjs/internal/operators/map';
import { ResourcesQuery } from 'src/app/store/resource/resource.query';
import { tObservableResource } from 'src/app/models/TObservableResource';
import { IStarship } from 'src/app/models/starships';
import { ResourceService } from 'src/app/store/resource/resource.service';
import { EResourceName } from 'src/app/data/EnumResourceName';
import { REGEXP_NUMBER } from 'src/app/data/constants';
import { stringMaxLength, stringToNumber } from 'src/app/supports/support';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-starships',
  templateUrl: './form-starships.component.html',
  styleUrls: ['./form-starships.component.scss'],
})
export class FormStarshipsComponent implements OnInit {
  starshipsForm: FormGroup;
  selectResource$: tObservableResource;
  nameStarships: string;
  category: string;
  isEditing: boolean = false;

  constructor(
    private resService: ResourceService,
    private resQuery: ResourcesQuery,
    private route: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    public snackBar: MatSnackBar
  ) {
    this.route.params.subscribe(
      (params) => (this.nameStarships = params['name'])
    );

    this._adapter.setLocale('ru-RU');

    this.starshipsForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      model: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      starship_class: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      manufacturer: new FormControl(null, Validators.required),

      cost_in_credits: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      length: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      crew: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      passengers: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      max_atmosphering_speed: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      MGLT: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      cargo_capacity: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      consumables: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      created: new FormControl(null, Validators.required),

      edited: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.selectResource$ = this.resQuery.selectStarships$;
    this.selectResource$
      .pipe(map((e) => e.filter((i) => i.name === this.nameStarships)))
      .subscribe((e) => {
        const starships: IStarship = e[0] as IStarship;
        this.starshipsForm.setValue({
          name: stringMaxLength(starships.name),
          model: stringMaxLength(starships.model),
          starship_class: stringMaxLength(starships.starship_class),
          manufacturer: stringMaxLength(starships.manufacturer),
          cost_in_credits: stringToNumber(starships.cost_in_credits),
          length: stringToNumber(starships.length),
          crew: stringToNumber(starships.crew),
          passengers: stringToNumber(starships.passengers),
          max_atmosphering_speed: stringToNumber(
            starships.max_atmosphering_speed
          ),
          MGLT: stringToNumber(starships.MGLT),
          cargo_capacity: stringToNumber(starships.cargo_capacity),
          consumables: stringMaxLength(starships.consumables),
          created: new Date(starships.created),
          edited: new Date(starships.edited),
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
      this.starshipsForm.enable();
    } else {
      this.starshipsForm.disable();
    }

    this.isEditing = !this.isEditing;
  }

  private update(form: FormGroup) {
    this.resService.updateResourceOnForm(form, EResourceName.starships);
  }

  submit() {
    this.update(this.starshipsForm);
  }
}
