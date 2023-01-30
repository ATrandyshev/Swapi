import { trigger, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/store/category/category.model';
import { CategorysQuery } from 'src/app/store/category/category.query';
import { CategoryService } from 'src/app/store/category/category.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  animations: [
    trigger('animationAppearance', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1.2s', style({ opacity: 1 })),
      ]),
      transition('* => void', [animate('1.2s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CardsComponent implements OnInit {
  categorys$: Observable<Category[]>;
  isLoading: boolean = false;

  constructor(
    private catagoryQuery: CategorysQuery,
    private catagoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.catagoryQuery.selectLoading().subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.categorys$ = this.catagoryQuery.selectCategorys$ as Observable<
      Category[]
    >;

    this.catagoryService.get().subscribe();
  }
}
