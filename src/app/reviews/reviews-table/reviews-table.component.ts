import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { Review } from '../../entity/review.interface';
import { combineLatest, Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { UserState } from '../../users/reducer/user.reducer';
import { map, takeUntil } from 'rxjs/operators';
import { getReviews } from '../selectors/review.selectors';
import { deleteReview } from '../actions/review.action';
import { RestaurantState } from '../../restaurants/reducer/restaurant.reducer';
import { Restaurant } from '../../entity/restaurant.interface';
import { getRestaurants } from '../../restaurants/selectors/review.selectors';
import { keyBy } from 'lodash';

@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrls: ['./reviews-table.component.scss'],
})
export class ReviewsTableComponent implements OnInit, OnDestroy {
  @ViewChild(MdbTableDirective, { static: true })
  reviewTable: MdbTableDirective;
  headElements = [
    'User First Name',
    'User Last Name',
    'Restaurant',
    'Review',
    'Delete',
  ];
  reviews$: Observable<Review[]>;
  private destroy$: Subject<void>;

  constructor(private store: Store<UserState | RestaurantState>) {
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.reviews$ = combineLatest([
      this.store.pipe(select(getReviews)),
      this.store.pipe(
        select(getRestaurants),
        map((restaurants) => keyBy(restaurants, '_id'))
      ),
    ]).pipe(
      map(([reviews, idToRestaurant]) => {
        return reviews.map((review) => ({
          ...review,
          restaurant: idToRestaurant[review.restaurant as any as string],
        }));
      })
    );

    this.reviews$
      .pipe(takeUntil(this.destroy$))
      .subscribe((reviews) => this.reviewTable.setDataSource(reviews));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  deleteReview(id: string): void {
    this.store.dispatch(deleteReview({ id }));
  }
}
