import { Identifiers } from '@angular/compiler';
import { createAction, props } from '@ngrx/store';
import { BookRequiredProps } from 'src/app/shared/models';

export const enter = createAction('[Books Page] Enter');

export const selectBook = createAction(
  '[Books Page] Select a Book',
  props<{ bookId: string }>()
);

export const clearSelectedBook = createAction(
  '[Books-Page] Clear Selected Book'
);

export const createBook = createAction(
  '[Books Page] Create a Book',
  props<{ book: BookRequiredProps }>()
);

export const updateBook = createAction(
  '[Books Page] Update a Book',
  props<{ bookId: string; changes: BookRequiredProps }>()
);

export const deleteBook = createAction(
  '[Books Page] Delete a Book',
  props<{ bookId: string }>()
);
