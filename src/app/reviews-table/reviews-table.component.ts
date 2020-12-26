import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {Review} from '../entity/review.interface';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {UserState} from '../users/reducer/user.reducer';
import {takeUntil} from 'rxjs/operators';
import {getReviews} from '../users/selectors/review.selectors';

@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrls: ['./reviews-table.component.scss']
})
export class ReviewsTableComponent implements OnInit, OnDestroy {
  @ViewChild(MdbTableDirective, {static: true}) reviewTable: MdbTableDirective;
  headElements = ['User First Name', 'User Last Name', 'Restaurant', 'Review', 'Delete'];
  reviews$: Observable<Review[]>;
  destroy$: Subject<void>;

  constructor(private store: Store<UserState>) {
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this.reviews$ = this.store.pipe(select(getReviews));

    this.reviews$.pipe(takeUntil(this.destroy$)).subscribe((reviews) => {
      this.reviewTable.setDataSource(reviews);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
