import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ResourcePageComponent } from './pages/resource-page/resource-page.component';
import { DescriptionPageComponent } from './pages/description-page/description-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', component: CategoryPageComponent },
  { path: 'resources/:category', component: ResourcePageComponent },
  {
    path: 'resources/:category/description/:name',
    component: DescriptionPageComponent,
  },
  { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
