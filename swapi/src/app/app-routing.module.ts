import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ResourcePageComponent } from './pages/resource-page/resource-page.component';

const routes: Routes = [
  { path: '', component: CategoryPageComponent },
  { path: 'resource', component: ResourcePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
