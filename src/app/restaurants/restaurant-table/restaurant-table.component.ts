import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {Restaurant} from '../../entity/restaurant.interface';
import {RestaurantState} from '../reducer/restaurant.reducer';
import {getRestaurants} from '../selectors/review.selectors';
import {deleteRestaurant, updateRestaurant} from '../actions/restaurant.action';
import {AreaEnum} from '../../entity/area.enum';
import {CategoryState} from '../../categories/reducer/category.reducer';
import {Category} from '../../entity/category.interface';
import {getCategories} from '../../categories/selectors/category.selectors';

@Component({
  selector: 'app-restaurant-table',
  templateUrl: './restaurant-table.component.html',
  styleUrls: ['./restaurant-table.component.scss']
})
export class RestaurantTableComponent implements OnInit, OnDestroy {
  @ViewChild(MdbTableDirective, {static: true}) restaurantTable: MdbTableDirective;
  headElements = ['Name', 'Category', 'Rating', 'Description', 'Address', 'Block Comments', 'Edit', 'Delete'];
  restaurants$: Observable<Restaurant[]>;
  categories$: Observable<Category[]>;
  destroy$: Subject<void>;
  areas = [AreaEnum.All, AreaEnum.CENTRAL, AreaEnum.NORTH, AreaEnum.SOUTH];
  rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  categories: Category[];
  searchNameText = '';

  constructor(private store: Store<RestaurantState | CategoryState>) {
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this.restaurants$ = this.store.pipe(select(getRestaurants));
    this.categories$ = this.store.pipe(select(getCategories));

    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((categories) => {
      this.categories = categories;
    });
    this.restaurants$.pipe(takeUntil(this.destroy$)).subscribe((restaurants) => {
      this.restaurantTable.setDataSource(restaurants);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onRestaurantUpdate(restaurant: Restaurant): void {
    this.store.dispatch(updateRestaurant({update: restaurant}));
  }

  deleteRestaurant(id: string): void {
    this.store.dispatch(deleteRestaurant({ id }));
  }

  search(): void {
  }
}
