import { createAction, props } from '@ngrx/store';
import {Category} from '../../entity/category.interface';

export const loadCategories = createAction('[Category] load categories');
export const loadCategoriesSuccess = createAction(
  '[Category] load categories success',
  props<{ categories: Category[] }>()
);
