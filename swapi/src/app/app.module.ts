import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ResourcePageComponent } from './pages/resource-page/resource-page.component';
import { DescriptionPageComponent } from './pages/description-page/description-page.component';
import { CardsResourceComponent } from './components/cards-resource/cards-resource.component';
import { CardsComponent } from './components/cards/cards.component';
import { DescriptionComponent } from './components/description/description.component';
import { FormPeopleComponent } from './components/form-people/form-people.component';

import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { FormFilmsComponent } from './components/form-films/form-films.component';
import { FormPlanetComponent } from './components/form-planet/form-planet.component';
import { FormSpeciesComponent } from './components/form-species/form-species.component';
import { FormVehiclesComponent } from './components/form-vehicles/form-vehicles.component';
import { FormStarshipsComponent } from './components/form-starships/form-starships.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardsResourceComponent,
    CategoryPageComponent,
    ResourcePageComponent,
    DescriptionComponent,
    DescriptionPageComponent,
    FormPeopleComponent,
    FormFilmsComponent,
    FormPlanetComponent,
    FormSpeciesComponent,
    FormVehiclesComponent,
    FormStarshipsComponent,
    NotFoundPageComponent,
    HeaderComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AkitaNgDevtools.forRoot(),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
