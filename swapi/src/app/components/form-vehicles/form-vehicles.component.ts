import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { map } from 'rxjs/internal/operators/map';
import { ResourcesQuery } from 'src/app/store/resource/resource.query';
import { tObservableResource } from 'src/app/models/TObservableResource';
import { IVehicles } from 'src/app/models/vehicles';
import { EResourceName } from 'src/app/data/EnumResourceName';
import { ResourceService } from 'src/app/store/resource/resource.service';
import { REGEXP_NUMBER } from 'src/app/data/constants';
import { stringMaxLength, stringToNumber } from 'src/app/supports/support';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-vehicles',
  templateUrl: './form-vehicles.component.html',
  styleUrls: ['./form-vehicles.component.scss'],
})
export class FormVehiclesComponent implements OnInit {
  vehiclesForm: FormGroup;
  selectResource$: tObservableResource;
  nameVehicles: string;
  isEditing: boolean = false;

  constructor(
    private resService: ResourceService,
    private resQuery: ResourcesQuery,
    private route: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    public snackBar: MatSnackBar
  ) {
    this.route.params.subscribe(
      (params) => (this.nameVehicles = params['name'])
    );
    this._adapter.setLocale('ru-RU');
    this.vehiclesForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      model: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      vehicle_class: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      manufacturer: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),

      length: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      cost_in_credits: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      crew: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      passengers: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      max_atmosphering_speed: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      cargo_capacity: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      consumables: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEXP_NUMBER),
      ]),

      created: new FormControl(null, Validators.required),

      edited: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.selectResource$ = this.resQuery.selectVehicles$;
    this.selectResource$
      .pipe(map((e) => e.filter((i) => i.name === this.nameVehicles)))
      .subscribe((e) => {
        const vehicles: IVehicles = e[0] as IVehicles;
        this.vehiclesForm.setValue({
          name: stringMaxLength(vehicles.name),
          model: stringMaxLength(vehicles.model),
          vehicle_class: stringMaxLength(vehicles.vehicle_class),
          manufacturer: stringMaxLength(vehicles.manufacturer),
          length: stringToNumber(vehicles.length),
          cost_in_credits: stringToNumber(vehicles.cost_in_credits),
          crew: stringToNumber(vehicles.crew),
          passengers: stringToNumber(vehicles.passengers),
          max_atmosphering_speed: stringToNumber(
            vehicles.max_atmosphering_speed
          ),
          cargo_capacity: stringToNumber(vehicles.cargo_capacity),
          consumables: stringToNumber(vehicles.consumables),
          created: new Date(vehicles.created),
          edited: new Date(vehicles.edited),
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
      this.vehiclesForm.enable();
    } else {
      this.vehiclesForm.disable();
    }

    this.isEditing = !this.isEditing;
  }

  private update(form: FormGroup) {
    this.resService.updateResourceOnForm(form, EResourceName.vehicles);
  }

  submit() {
    this.update(this.vehiclesForm);
  }
}
