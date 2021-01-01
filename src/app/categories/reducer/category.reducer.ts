import {createReducer, on} from '@ngrx/store';
import {loadCategoriesSuccess} from '../actions/category.action';
import {Category} from '../../entity/category.interface';

export interface CategoryState {
  categories: Category[];
}

export const categoryStateToken = 'categories';

const initialState: CategoryState = {categories: []};

export const categoriesReducer = createReducer(
  initialState,
  on(loadCategoriesSuccess, (state, {categories}) => ({...state, categories}))
);
