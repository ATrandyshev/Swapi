import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/internal/operators/map';
import { IFilm } from 'src/app/models/film';
import { ResourcesQuery } from 'src/app/store/resource/resource.query';
import { tObservableResource } from 'src/app/models/TObservableResource';
import { ResourceService } from 'src/app/store/resource/resource.service';
import { EResourceName } from 'src/app/data/EnumResourceName';
import { REGEXP_NUMBER } from 'src/app/data/constants';
import { stringMaxLength } from 'src/app/supports/support';

@Component({
  selector: 'app-form-films',
  templateUrl: './form-films.component.html',
  styleUrls: ['./form-films.component.scss'],
})
export class FormFilmsComponent implements OnInit {
  filmForm: FormGroup;
  selectResource$: tObservableResource;
  nameFilm: string;
  isEditing: boolean = false;

  constructor(
    private resService: ResourceService,
    private resQuery: ResourcesQuery,
    private route: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    public snackBar: MatSnackBar
  ) {
    this.route.params.subscribe((params) => {
      this.nameFilm = params['name'];
    });

    this._adapter.setLocale('ru-RU');

    this.filmForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      episode_id: new FormControl(null, [
        Validators.pattern(REGEXP_NUMBER),
        Validators.required,
      ]),

      opening_crawl: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      director: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      producer: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      release_date: new FormControl(null, Validators.required),

      created: new FormControl(null, Validators.required),

      edited: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.selectResource$ = this.resQuery.selectFilms$;
    this.selectResource$
      .pipe(
        map((e) =>
          e.filter((i) => {
            return i.title === this.nameFilm;
          })
        )
      )
      .subscribe((e) => {
        const films: IFilm = e[0] as IFilm;
        this.filmForm.setValue({
          title: stringMaxLength(films.title),
          episode_id: films.episode_id,
          opening_crawl: stringMaxLength(films.opening_crawl),
          director: stringMaxLength(films.director),
          producer: stringMaxLength(films.producer),
          release_date: new Date(films.release_date),
          created: new Date(films.created),
          edited: new Date(films.edited),
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
      this.filmForm.enable();
    } else {
      this.filmForm.disable();
    }

    this.isEditing = !this.isEditing;
  }

  private update(form: FormGroup) {
    this.resService.updateResourceOnForm(form, EResourceName.films);
  }

  submit() {
    this.update(this.filmForm);
  }
}
