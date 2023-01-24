import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { CardsComponent } from './components/cards/cards.component';
import { CardsResourceComponent } from './components/cards-resource/cards-resource.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ResourcePageComponent } from './pages/resource-page/resource-page.component';

@NgModule({
  declarations: [AppComponent, CardsComponent, CardsResourceComponent, CategoryPageComponent, ResourcePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
