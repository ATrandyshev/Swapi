import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { map } from 'rxjs';
import { ResourcesQuery } from 'src/app/store/resource/resource.query';
import { tObservableResource } from 'src/app/models/TObservableResource';
import { ISpecies } from 'src/app/models/species';
import { ResourceService } from 'src/app/store/resource/resource.service';
import { EResourceName } from 'src/app/data/EnumResourceName';
import { REGEXP_NUMBER } from 'src/app/data/constants';
import { stringMaxLength, stringToNumber } from 'src/app/supports/support';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-species',
  templateUrl: './form-species.component.html',
  styleUrls: ['./form-species.component.scss'],
})
export class FormSpeciesComponent implements OnInit {
  speciesForm: FormGroup;
  selectResource$: tObservableResource;
  nameSpecies: string;
  isEditing: boolean = false;

  constructor(
    private resService: ResourceService,
    private resQuery: ResourcesQuery,
    private route: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    public snackBar: MatSnackBar
  ) {
    this.route.params.subscribe(
      (params) => (this.nameSpecies = params['name'])
    );

    this._adapter.setLocale('ru-RU');

    this.speciesForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      classification: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      designation: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      average_height: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      average_lifespan: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      eye_colors: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      hair_colors: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      skin_colors: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      language: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      created: new FormControl(null, Validators.required),

      edited: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.selectResource$ = this.resQuery.selectSpecies$;
    this.selectResource$
      .pipe(map((e) => e.filter((i) => i.name === this.nameSpecies)))
      .subscribe((e) => {
        const species: ISpecies = e[0] as ISpecies;
        this.speciesForm.setValue({
          name: stringMaxLength(species.name),
          classification: stringMaxLength(species.classification),
          designation: stringMaxLength(species.designation),
          average_height: stringToNumber(species.average_height),
          average_lifespan: stringToNumber(species.average_lifespan),
          eye_colors: stringMaxLength(species.eye_colors),
          hair_colors: stringMaxLength(species.hair_colors),
          skin_colors: stringMaxLength(species.skin_colors),
          language: stringMaxLength(species.language),
          created: new Date(species.created),
          edited: new Date(species.edited),
        });
      });

    this.onClickChangeEditing();
  }

  onClickChangeEditing() {
    if (this.isEditing) {
      this.speciesForm.enable();
    } else {
      this.speciesForm.disable();
    }

    this.isEditing = !this.isEditing;
  }

  openSnackBar() {
    this.snackBar.open('SAVED', 'close', {
      duration: 2000,
    });
  }

  private update(form: FormGroup) {
    this.resService.updateResourceOnForm(form, EResourceName.species);
  }

  submit() {
    this.update(this.speciesForm);
  }
}
