import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import {Review} from '../../entity/review.interface';
import {
  deleteReview,
  deleteReviewSuccess,
  loadReview,
  loadReviewSuccess
} from '../actions/review.action';
import {combineLatest} from 'rxjs';
import {AuthorizationService} from '../../authorization-service';

@Injectable()
export class ReviewEffects implements OnInitEffects {
  constructor(private actions: Actions, private http: HttpClient, private authorizationService: AuthorizationService) {
  }

  loadReview$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(loadReview)),
    ]).pipe (
      switchMap(([token]) =>
        this.http.get('https://food-dude.herokuapp.com/reviews', {
          headers: {
            Authorization: token
          },
        })
      ),
      map((reviews: Review[]) => loadReviewSuccess({reviews}))
    )
  );

  deleteReview$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(deleteReview)),
    ]).pipe(
      switchMap(([token, {id}]) =>
        this.http.delete(
          `https://food-dude.herokuapp.com/Reviews/${id}`,
          {
            headers: {
              Authorization: token
            },
          }
        )
      ),
      map((review: Review) => deleteReviewSuccess({review}))
    )
  );

  ngrxOnInitEffects(): Action {
    return loadReview();
  }
}
