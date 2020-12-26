import { createAction, props } from '@ngrx/store';
import {Review} from '../../entity/review.interface';

export const loadReview = createAction('[Reviews] load reviews');
export const loadReviewSuccess = createAction(
  '[Review] load review success',
  props<{ reviews: Review[] }>()
);
