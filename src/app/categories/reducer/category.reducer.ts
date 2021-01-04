import {createReducer, on} from '@ngrx/store';
import {createCategorySuccess, deleteCategorySuccess, loadCategoriesSuccess, updateCategorySuccess} from '../actions/category.action';
import {Category} from '../../entity/category.interface';

export interface CategoryState {
  categories: Category[];
}

export const categoryStateToken = 'categories';

const initialState: CategoryState = {categories: []};

export const categoriesReducer = createReducer(
  initialState,
  on(loadCategoriesSuccess, (state, {categories}) => ({...state, categories})),
  on(deleteCategorySuccess, (state, { category }) => ({
    ...state,
    categories: state.categories.filter(currentCategory => currentCategory._id !== category._id)
  })),
  on(updateCategorySuccess, (state, { category }) => ({
    ...state,
    categories: state.categories.map((u) => (u._id === category._id ? category : u)),
  })),
  on(createCategorySuccess, (state, {category}) => ({...state, categories: [...state.categories, category]})),
);
