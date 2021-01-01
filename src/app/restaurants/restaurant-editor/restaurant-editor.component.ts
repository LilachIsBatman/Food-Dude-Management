import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Restaurant} from '../../entity/restaurant.interface';
import {cloneDeep} from 'lodash';
import {select, Store} from '@ngrx/store';
import {CategoryState} from '../../categories/reducer/category.reducer';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Category} from '../../entity/category.interface';
import {getCategories} from '../../categories/selectors/category.selectors';

@Component({
  selector: 'app-restaurant-editor',
  templateUrl: './restaurant-editor.component.html',
  styleUrls: ['./restaurant-editor.component.scss']
})
export class RestaurantEditorComponent implements OnInit, OnDestroy {
  @Input() restaurant: Restaurant;
  @Output() restaurantUpdate: EventEmitter<Restaurant>;
  editedRestaurant: Restaurant;
  categories$: Observable<Category[]>;
  destroy$: Subject<void>;
  categories: Category[];
  rating: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private store: Store<CategoryState>) {
    this.restaurantUpdate = new EventEmitter<Restaurant>();
  }

  ngOnInit(): void {
    this.editedRestaurant = cloneDeep(this.restaurant);
    this.destroy$ = new Subject<void>();
    this.categories$ = this.store.pipe(select(getCategories));
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((categories) => {
      this.categories = categories;
    });
  }

  updateRestaurant(restaurant: Restaurant): void {
    this.restaurantUpdate.emit(restaurant);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  getCategory(): Category {
    return this.editedRestaurant.category;
  }

  getRating(): number {
    return this.editedRestaurant.rating;
  }
}
