import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CategoryState, CategoryStore } from './category.store';

@Injectable({ providedIn: 'root' })
export class CategorysQuery extends QueryEntity<CategoryState> {
  selectCategorys$ = this.select((state) => state.ids);

  constructor(protected override store: CategoryStore) {
    super(store);
  }
}
