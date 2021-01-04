import { createAction, props } from '@ngrx/store';
import {Category} from '../../entity/category.interface';

export const loadCategories = createAction('[Category] load categories');
export const loadCategoriesSuccess = createAction(
  '[Category] load categories success',
  props<{ categories: Category[] }>()
);

export const deleteCategory = createAction(
  '[Category] delete category',
  props<{ id: string }>()
);
export const deleteCategorySuccess = createAction(
  '[Category] delete category success',
  props<{ category: Category }>()
);

export const updateCategory = createAction(
  '[Category] update category',
  props<{ update: Partial<Category> }>()
);
export const updateCategorySuccess = createAction(
  '[Category] update category success',
  props<{ category: Category }>()
);

export const createCategory = createAction(
  '[Category] create category',
  props<{ create: Partial<Category> }>()
);
export const createCategorySuccess = createAction(
  '[Category] create category success',
  props<{ category: Category }>()
);
