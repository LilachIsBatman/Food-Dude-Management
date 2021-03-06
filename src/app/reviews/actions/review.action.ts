import { createAction, props } from '@ngrx/store';
import {Review} from '../../entity/review.interface';

export const loadReview = createAction('[Reviews] load reviews');
export const loadReviewSuccess = createAction(
  '[Review] load review success',
  props<{ reviews: Review[] }>()
);
export const deleteReview = createAction('[Reviews] delete review', props<{ id: string }>());
export const deleteReviewSuccess = createAction(
  '[Review] delete review success',
  props<{ review: Review }>()
);

export const searchReviewByRestaurantName = createAction(
  '[Review] search review by restaurant name',
  props<{ restaurantName: string }>()
);

