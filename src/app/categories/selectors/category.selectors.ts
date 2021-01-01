import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CategoryState, categoryStateToken} from '../reducer/category.reducer';

const getCategoriesState = createFeatureSelector<CategoryState>(categoryStateToken);
export const getCategories = createSelector(getCategoriesState, (state) => state.categories);
