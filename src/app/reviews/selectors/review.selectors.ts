import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ReviewState, reviewStateToken} from '../reducer/review.reducer';

const getReviewsState = createFeatureSelector<ReviewState>(reviewStateToken);
export const getReviews = createSelector(getReviewsState, (state) => state.reviews);
