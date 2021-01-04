import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Category} from '../../entity/category.interface';
import {CategoryState} from '../reducer/category.reducer';
import {getCategories} from '../selectors/category.selectors';
import {updateCategory} from '../actions/category.action';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit, OnDestroy {
  @ViewChild(MdbTableDirective, { static: true })
  categoriesTable: MdbTableDirective;
  headElements = [
    'Name',
    'Description',
    'Edit',
    'Delete'
  ];
  categories$: Observable<Category[]>;
  private destroy$: Subject<void>;

  constructor(private store: Store<CategoryState>) {
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.categories$ = this.store.pipe(select(getCategories));

    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((categories) => {
      this.categoriesTable.setDataSource(categories);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  deleteCategory(id: string): void {
    // this.store.dispatch(deleteC({ id }));
  }

  openNewCategory(): void {
  }

  onCategoryUpdate(category: Category): void {
    this.store.dispatch(updateCategory({ update: category }));
  }
}