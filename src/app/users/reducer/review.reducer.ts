import { createReducer, on } from '@ngrx/store';
import {Review} from '../../entity/review.interface';
import {loadReviewSuccess} from '../actions/review.action';

export interface ReviewState {
  reviews: Review[];
}

export const reviewStateToken = 'reviews';

const initialState: ReviewState = { reviews: [] };

export const reviewReducer = createReducer(
  initialState,
  on(loadReviewSuccess, (state, { reviews }) => ({ ...state, reviews }))
);
