import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CategoryStore } from './category.store';
import { Category } from './category.model';
import { API } from 'src/app/data/api';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    private categorysStore: CategoryStore,
    private http: HttpClient
  ) {}

  get() {
    this.categorysStore.setLoading(true);

    return this.http.get<Category[]>(API.root).pipe(
      tap((entities) => {
        this.categorysStore.set(entities);
      })
    );
  }
}
