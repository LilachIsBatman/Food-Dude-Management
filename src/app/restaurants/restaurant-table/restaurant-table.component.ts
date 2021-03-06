import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import { map, takeUntil} from 'rxjs/operators';
import {Restaurant} from '../../entity/restaurant.interface';
import {RestaurantState} from '../reducer/restaurant.reducer';
import {getRestaurants} from '../selectors/review.selectors';
import {createRestaurant, deleteRestaurant, loadRestaurants, searchRestaurants, updateRestaurant} from '../actions/restaurant.action';
import {AreaEnum} from '../../entity/area.enum';
import {CategoryState} from '../../categories/reducer/category.reducer';
import {Category} from '../../entity/category.interface';
import {getCategories} from '../../categories/selectors/category.selectors';
import {isNil, omitBy} from 'lodash';
import {WebsocketService} from '../../login/websocket-service';

@Component({
  selector: 'app-restaurant-table',
  templateUrl: './restaurant-table.component.html',
  styleUrls: ['./restaurant-table.component.scss'],
})
export class RestaurantTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) restaurantTable: MdbTableDirective;
  headElements = ['Name', 'Category', 'Rating', 'Description', 'Address', 'Block Review', 'Edit', 'Delete'];
  restaurants$: Observable<Restaurant[]>;
  categories$: Observable<Category[]>;
  destroy$: Subject<void>;
  areas = [AreaEnum.CENTER, AreaEnum.NORTH, AreaEnum.SOUTH];
  areasWithDefault = [AreaEnum.All, ...this.areas];
  rating = [1, 2, 3, 4, 5];
  categoriesWithDefault$: Observable<Category[]>;
  searchNameText = '';
  selectedArea = AreaEnum.All;
  selectedCategory: string;
  selectedRating = 1;

  constructor(private store: Store<RestaurantState | CategoryState>, private changeDetectorRef: ChangeDetectorRef,
              private websocketService: WebsocketService) {
    this.store.dispatch(loadRestaurants());
  }

  ngOnInit(): void {
    const emptyCategory = {name: 'all categories', description: '1', _id: '1'};
    this.selectedCategory = emptyCategory.name;
    this.destroy$ = new Subject<void>();
    this.restaurants$ = this.store.pipe(select(getRestaurants));
    this.categories$ = this.store.pipe(select(getCategories));
    this.categoriesWithDefault$ = this.categories$.pipe(map(categories => [emptyCategory, ...categories]));
    this.restaurants$.pipe(takeUntil(this.destroy$)).subscribe((restaurants) => {
      this.restaurantTable.setDataSource(restaurants);
    });
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(6);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onCreateRestaurant(restaurant: Restaurant): void {
    this.store.dispatch(createRestaurant({create: restaurant}));
  }

  onRestaurantUpdate(restaurant: Restaurant): void {
    this.store.dispatch(updateRestaurant({update: restaurant}));
  }

  deleteRestaurant(id: string): void {
    this.store.dispatch(deleteRestaurant({ id }));
  }

  search(): void {
    this.store.dispatch(
      searchRestaurants({
        params: omitBy(
          {
            name: this.searchNameText || undefined,
            minRating: this.selectedRating || undefined,
            area: this.getSearchableArea(),
            category: this.getSearchableCategory()
          },
          isNil
        ),
      })
    );
  }

  getSearchableArea(): AreaEnum {
    return this.selectedArea === AreaEnum.All ? undefined : this.selectedArea;
  }

  getSearchableCategory(): string {
    return this.selectedCategory === 'all categories' ? undefined : this.selectedCategory;
  }

  onBlockRestaurantClick(restaurant: Restaurant): void {
    if (restaurant.reviewsBlocked) {
      this.allowRestaurantReviews(restaurant);
    } else {
      this.blockRestaurantReviews(restaurant);
    }
  }

  private blockRestaurantReviews(restaurant: Restaurant): void {
    this.websocketService.blockRestaurantReviews(restaurant._id);
  }

  private allowRestaurantReviews(restaurant: Restaurant): void {
    this.websocketService.allowRestaurantReviews(restaurant._id);
  }
}
