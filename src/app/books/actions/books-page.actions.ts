import { createAction, props } from '@ngrx/store';
import { BookRequiredProps } from 'src/app/shared/models';

export const createBook = createAction(
  '[Books-Page] Create a Book',
  props<{ book: BookRequiredProps }>()
);

export const updateBook = createAction(
  '[Books-Page] Update a Book',
  props<{ book: BookRequiredProps; id: string }>()
);

export const deleteBook = createAction(
  '[Books-Page] Delete a Book',
  props<{ id: string }>()
);

export const cancelBook = createAction('[Books-Page] Cancel editing a Book');
