import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { map } from 'rxjs';
import { IPeople } from 'src/app/models/people';
import { ResourcesQuery } from 'src/app/store/resource/resource.query';
import { tObservableResource } from 'src/app/models/TObservableResource';
import { EResourceName } from 'src/app/data/EnumResourceName';
import { ResourceService } from 'src/app/store/resource/resource.service';
import { REGEXP_NUMBER } from 'src/app/data/constants';
import { stringMaxLength, stringToNumber } from 'src/app/supports/support';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-people',
  templateUrl: './form-people.component.html',
  styleUrls: ['./form-people.component.scss'],
})
export class FormPeopleComponent implements OnInit {
  peopleForm: FormGroup;
  selectResource$: tObservableResource;
  namePeople: string;
  isEditing: boolean = false;

  constructor(
    private resService: ResourceService,
    private resQuery: ResourcesQuery,
    private route: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    public snackBar: MatSnackBar
  ) {
    this.route.params.subscribe((params) => (this.namePeople = params['name']));

    this._adapter.setLocale('ru-RU');

    this.peopleForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      birth_year: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      eye_color: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      gender: new FormControl(null, Validators.required),

      hair_color: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      height: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      mass: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      skin_color: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      created: new FormControl(null, Validators.required),

      edited: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.selectResource$ = this.resQuery.selectPeople$;
    this.selectResource$
      .pipe(
        map((e) =>
          e.filter((i) => {
            return i.name === this.namePeople;
          })
        )
      )
      .subscribe((e) => {
        const people: IPeople = e[0] as IPeople;
        this.peopleForm.setValue({
          name: stringMaxLength(people.name),
          birth_year: stringMaxLength(people.birth_year),
          eye_color: stringMaxLength(people.eye_color),
          gender: stringMaxLength(people.gender),
          hair_color: stringMaxLength(people.hair_color),
          height: stringToNumber(people.height),
          mass: stringToNumber(people.mass),
          skin_color: stringMaxLength(people.skin_color),
          created: new Date(people.created),
          edited: new Date(people.edited),
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
      this.peopleForm.enable();
    } else {
      this.peopleForm.disable();
    }

    this.isEditing = !this.isEditing;
  }

  private update(form: FormGroup) {
    this.resService.updateResourceOnForm(form, EResourceName.people);
  }

  submit() {
    this.update(this.peopleForm);
  }
}
